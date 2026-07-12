from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from uuid import uuid4
from datetime import datetime

# Import the models directly from the models.py file next door
from .models import Maintenance, FuelLog, Expense

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
# 3. LIVE RUNNING COST CALCULATION
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