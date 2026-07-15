from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Vehicle, VehicleStatus

router = APIRouter(
    prefix="/vehicles",
    tags=["vehicles"]
)

#Creating vehicle
@router.post("/", status_code=201)
def create_vehicle(
    registration_number: str,
    name_model: str,
    type: str,
    max_load_capacity_kg: float,
    odometer: float,
    acquisition_cost: float,
    db: Session = Depends(get_db)
):
    # Check if registration number already exists
    existing_vehicle = db.query(Vehicle).filter(
        Vehicle.registration_number == registration_number
    ).first()

    if existing_vehicle:
        raise HTTPException(
            status_code=400,
            detail="Vehicle with this registration number already exists."
        )

    # Create vehicle
    vehicle = Vehicle(
        registration_number=registration_number,
        name_model=name_model,
        type=type,
        max_load_capacity_kg=max_load_capacity_kg,
        odometer=odometer,
        acquisition_cost=acquisition_cost,
        status=VehicleStatus.AVAILABLE
    )

    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)

    return vehicle

#Getting the list of all vehicles
@router.get("/")
def get_all_vehicles(db: Session = Depends(get_db)):
    vehicles = db.query(Vehicle).all()
    return vehicles

#Getting a specific vehicle by ID
@router.get("/{vehicle_id}")
def get_vehicle(vehicle_id: str, db: Session = Depends(get_db)):
    vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

    if not vehicle:
        raise HTTPException(
            status_code=404,
            detail="Vehicle not found"
        )

    return vehicle

# yet to do update and delete operations for vehicles... 