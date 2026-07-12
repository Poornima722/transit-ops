from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from .database import get_db
from uuid import uuid4
from datetime import datetime

# Import the models directly from the models.py file next door
from .models import Maintenance, FuelLog, Expense, Vehicle

# NOTE: Adjust this import path if Pratheeksha put the database engine/session 
# inside a separate file like database.py or config.py
# from .database import get_db 

router = APIRouter(prefix="/api", tags=["Operations & Maintenance"])

# ==========================================
# 1. MAINTENANCE LOGS (TASK 1)
# ==========================================

@router.post("/maintenance", status_code=status.HTTP_201_CREATED)
def create_maintenance_log(vehicle_id: str, description: str, cost: float = 0.0, db: Session = Depends(get_db)):
    # Create the log matching the explicit schema fields
    new_log = Maintenance(
        id=str(uuid4()),
        vehicle_id=vehicle_id,
        description=description,
        cost=cost,
        status="ACTIVE", # Pylance might highlight this until MaintenanceStatus enum is imported
        created_at=datetime.utcnow()
    )
    
    db.add(new_log)
    db.commit()
    db.refresh(new_log)
    return {"message": "Maintenance log created successfully", "log_id": new_log.id}


@router.put("/maintenance/{log_id}/close")
def close_maintenance_log(log_id: str, db: Session = Depends(get_db)):
    log = db.query(Maintenance).filter(Maintenance.id == log_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Maintenance log not found")
        
    log.status = "CLOSED" 
    log.closed_at = datetime.utcnow()
    
    db.commit()
    return {"message": "Maintenance log closed successfully"}


# ==========================================
# 2. FUEL & EXPENSES (TASK 2)
# ==========================================

@router.post("/fuel", status_code=status.HTTP_201_CREATED)
def log_fuel(vehicle_id: str, liters: float, cost: float, db: Session = Depends(get_db)):
    new_fuel_log = FuelLog(
        id=str(uuid4()),
        vehicle_id=vehicle_id,
        liters=liters,
        cost=cost,
        date=datetime.utcnow()
    )
    db.add(new_fuel_log)
    db.commit()
    return {"message": "Fuel purchase logged successfully"}


@router.post("/expenses", status_code=status.HTTP_201_CREATED)
def log_expense(vehicle_id: str, category: str, amount: float, notes: str = None, db: Session = Depends(get_db)):
    new_expense = Expense(
        id=str(uuid4()),
        vehicle_id=vehicle_id,
        category=category,
        amount=amount,
        notes=notes,
        date=datetime.utcnow()
    )
    db.add(new_expense)
    db.commit()
    return {"message": "Expense item logged successfully"}


# ==========================================
# LIVE RUNNING COST CALCULATION
# ==========================================

@router.get("/vehicles/{vehicle_id}/running-cost")
def get_running_cost(vehicle_id: str, db: Session = Depends(get_db)):
    # Correct SQLAlchemy aggregation methods using func.sum()
    fuel_sum = db.query(func.sum(FuelLog.cost)).filter(FuelLog.vehicle_id == vehicle_id).scalar() or 0.0
    expense_sum = db.query(func.sum(Expense.amount)).filter(Expense.vehicle_id == vehicle_id).scalar() or 0.0
    maint_sum = db.query(func.sum(Maintenance.cost)).filter(Maintenance.vehicle_id == vehicle_id).scalar() or 0.0
    
    total_running_cost = fuel_sum + expense_sum + maint_sum
    
    return {
        "vehicle_id": vehicle_id,
        "breakdown": {
            "fuel_spend": fuel_sum,
            "general_expenses": expense_sum,
            "maintenance_spend": maint_sum
        },
        "total_running_cost": total_running_cost
    }

# ==========================================
# 3. LIVE EXECUTIVE DASHBOARD KPIs (TASK 3)
# ==========================================

@router.get("/dashboard/kpis")
def get_fleet_dashboard_kpis(db: Session = Depends(get_db)):
    try:
        # 1. Total Fleet Running Cost Aggregations (Across all vehicles)
        grand_fuel = db.query(func.sum(FuelLog.cost)).scalar() or 0.0
        grand_expenses = db.query(func.sum(Expense.amount)).scalar() or 0.0
        grand_maint = db.query(func.sum(Maintenance.cost)).scalar() or 0.0
        total_fleet_spend = grand_fuel + grand_expenses + grand_maint

        # 2. Vehicle Status Counts
        # We import Vehicle dynamically inside the function or at the top if available
        # from .models import Vehicle
        total_vehicles = db.query(Vehicle).count()
        active_vehicles = db.query(Vehicle).filter(Vehicle.status == "Available").count()
        on_trip_vehicles = db.query(Vehicle).filter(Vehicle.status == "On Trip").count()
        in_shop_vehicles = db.query(Vehicle).filter(Vehicle.status == "In Shop").count()

        # 3. Fleet Utilization Rate Calculation
        # Formula: (Vehicles on Trip) / (Total Active Operational Vehicles) * 100
        operational_vehicles = active_vehicles + on_trip_vehicles
        utilization_rate = 0.0
        if operational_vehicles > 0:
            utilization_rate = round((on_trip_vehicles / operational_vehicles) * 100, 2)

        return {
            "summary": {
                "total_fleet_cost": total_fleet_spend,
                "fuel_share": grand_fuel,
                "expense_share": grand_expenses,
                "maintenance_share": grand_maint
            },
            "fleet_status": {
                "total_fleet_size": total_vehicles,
                "available": active_vehicles,
                "on_trip": on_trip_vehicles,
                "in_shop": in_shop_vehicles
            },
            "metrics": {
                "utilization_rate_percent": utilization_rate
            }
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Failed to calculate dashboard KPIs: {str(e)}"
        )

# ==========================================
# 4. REPORTS & FINANCIAL ANALYTICS (TASK 4)
# ==========================================

@router.get("/reports/fuel-efficiency")
def get_fuel_efficiency_report(db: Session = Depends(get_db)):
    try:
        # Group fuel logs by vehicle to calculate efficiency metrics
        records = db.query(
            FuelLog.vehicle_id,
            func.sum(FuelLog.liters).label("total_liters"),
            func.sum(FuelLog.cost).label("total_spent"),
            func.count(FuelLog.id).label("fill_ups")
        ).group_by(FuelLog.vehicle_id).all()
        
        report = []
        for r in records:
            # Simple efficiency metric: Avg liters per fill-up (or cost per liter)
            avg_liters_per_trip = round(r.total_liters / r.fill_ups, 2) if r.fill_ups > 0 else 0.0
            report.append({
                "vehicle_id": r.vehicle_id,
                "total_liters_consumed": r.total_liters,
                "total_fuel_spend": r.total_spent,
                "fill_ups_count": r.fill_ups,
                "avg_liters_per_fill": avg_liters_per_trip
            })
            
        return {"report_type": "Fuel Efficiency Analytics", "data": report}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Fuel report failed: {str(e)}")


@router.get("/reports/fleet-roi")
def get_fleet_roi_report(db: Session = Depends(get_db)):
    try:
        # High-level breakdown per vehicle to display ROI parameters
        vehicles = db.query(Vehicle.id, Vehicle.status).all()
        roi_report = []
        
        for v in vehicles:
            fuel_cost = db.query(func.sum(FuelLog.cost)).filter(FuelLog.vehicle_id == v.id).scalar() or 0.0
            exp_cost = db.query(func.sum(Expense.amount)).filter(Expense.vehicle_id == v.id).scalar() or 0.0
            maint_cost = db.query(func.sum(Maintenance.cost)).filter(Maintenance.vehicle_id == v.id).scalar() or 0.0
            
            total_outflow = fuel_cost + exp_cost + maint_cost
            
            # Mocking operational yield/revenue for demo purposes to calculate ROI
            # In a live app, this would query Trip revenues
            estimated_revenue = total_outflow * 1.4  
            net_profit = estimated_revenue - total_outflow
            
            roi_report.append({
                "vehicle_id": v.id,
                "status": v.status,
                "total_expenses": total_outflow,
                "estimated_revenue": round(estimated_revenue, 2),
                "net_profit": round(net_profit, 2),
                "roi_percentage": 40.0 if total_outflow > 0 else 0.0
            })
            
        return {"report_type": "Fleet ROI Financial Summary", "data": roi_report}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ROI report failed: {str(e)}")