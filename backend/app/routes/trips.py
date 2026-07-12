from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.models import Trip, Vehicle, Driver, TripStatus, VehicleStatus, DriverStatus
from app.database import get_db

router = APIRouter(prefix="/trips", tags=["trips"])


@router.post("/{trip_id}/dispatch")
def dispatch_trip(trip_id: str, db: Session = Depends(get_db)):
    # 1. Fetch the trip
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")

    # 2. Cheap check first: must be Draft
    if trip.status != TripStatus.DRAFT:
        raise HTTPException(
            status_code=400,
            detail={"error": "Trip is not in Draft status", "current_status": trip.status}
        )

    # 3. Fetch vehicle + driver
    vehicle = db.query(Vehicle).filter(Vehicle.id == trip.vehicle_id).first()
    driver = db.query(Driver).filter(Driver.id == trip.driver_id).first()

    # 4. Vehicle must be Available
    if vehicle.status != VehicleStatus.AVAILABLE:
        raise HTTPException(
            status_code=400,
            detail={"error": "Vehicle is not available", "vehicle_status": vehicle.status}
        )

    # 5. Driver must be Available
    if driver.status != DriverStatus.AVAILABLE:
        raise HTTPException(
            status_code=400,
            detail={"error": "Driver is not available", "driver_status": driver.status}
        )

    # 6. License must not be expired
    if driver.license_expiry_date < datetime.utcnow():
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Driver's license has expired",
                "license_expiry_date": driver.license_expiry_date.isoformat()
            }
        )

    # 7. Cargo must not exceed capacity
    if trip.cargo_weight_kg > vehicle.max_load_capacity_kg:
        raise HTTPException(
            status_code=400,
            detail={
                "error": "Cargo weight exceeds vehicle capacity",
                "cargo_weight_kg": trip.cargo_weight_kg,
                "max_load_capacity_kg": vehicle.max_load_capacity_kg
            }
        )

    # 8. All checks passed -> flip statuses
    trip.status = TripStatus.DISPATCHED
    trip.dispatched_at = datetime.utcnow()
    vehicle.status = VehicleStatus.ON_TRIP
    driver.status = DriverStatus.ON_TRIP

    db.commit()
    db.refresh(trip)
    db.refresh(vehicle)
    db.refresh(driver)

    # 9. Return full updated trip (include nested vehicle + driver for the frontend)
    return {
        "id": trip.id,
        "status": trip.status,
        "dispatched_at": trip.dispatched_at,
        "cargo_weight_kg": trip.cargo_weight_kg,
        "planned_distance_km": trip.planned_distance_km,
        "vehicle": {
            "id": vehicle.id,
            "registration_number": vehicle.registration_number,
            "status": vehicle.status
        },
        "driver": {
            "id": driver.id,
            "name": driver.name,
            "status": driver.status
        }
    }