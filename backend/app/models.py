"""
TransitOps — Shared Database Schema
=====================================
Source of truth for all 3 team members. Build your endpoints against these models.

Owners:
  - Person A : User, Vehicle, Driver
  - Person B : Trip
  - Person C: Maintenance, FuelLog, Expense

Run `alembic revision --autogenerate -m "init"` then `alembic upgrade head`
to create these tables once Postgres is running.
"""

import enum
import uuid
from datetime import datetime

from sqlalchemy import (
    Column, String, Integer, Float, DateTime, Enum, ForeignKey, Boolean, Text
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship, declarative_base

Base = declarative_base()


def gen_uuid():
    return str(uuid.uuid4())


# ---------------------------------------------------------------------------
# ENUMS — match the mockup exactly
# ---------------------------------------------------------------------------

class UserRole(str, enum.Enum):
    FLEET_MANAGER = "Fleet Manager"
    DISPATCHER = "Dispatcher"
    SAFETY_OFFICER = "Safety Officer"
    FINANCIAL_ANALYST = "Financial Analyst"


class VehicleStatus(str, enum.Enum):
    AVAILABLE = "Available"
    ON_TRIP = "On Trip"
    IN_SHOP = "In Shop"
    RETIRED = "Retired"


class DriverStatus(str, enum.Enum):
    AVAILABLE = "Available"
    ON_TRIP = "On Trip"
    OFF_DUTY = "Off Duty"
    SUSPENDED = "Suspended"


class TripStatus(str, enum.Enum):
    DRAFT = "Draft"
    DISPATCHED = "Dispatched"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


class MaintenanceStatus(str, enum.Enum):
    ACTIVE = "Active"
    CLOSED = "Closed"


# ---------------------------------------------------------------------------
# PERSON A  — Users, Vehicles, Drivers
# ---------------------------------------------------------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    registration_number = Column(String, unique=True, nullable=False, index=True)
    name_model = Column(String, nullable=False)
    type = Column(String, nullable=False)  # e.g. Van, Truck, Bike
    max_load_capacity_kg = Column(Float, nullable=False)
    odometer = Column(Float, default=0)
    acquisition_cost = Column(Float, nullable=False)
    status = Column(Enum(VehicleStatus), default=VehicleStatus.AVAILABLE, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    trips = relationship("Trip", back_populates="vehicle")
    maintenance_logs = relationship("Maintenance", back_populates="vehicle")
    fuel_logs = relationship("FuelLog", back_populates="vehicle")
    expenses = relationship("Expense", back_populates="vehicle")


class Driver(Base):
    __tablename__ = "drivers"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    name = Column(String, nullable=False)
    license_number = Column(String, unique=True, nullable=False)
    license_category = Column(String, nullable=False)
    license_expiry_date = Column(DateTime, nullable=False)
    contact_number = Column(String, nullable=False)
    safety_score = Column(Float, default=100)
    status = Column(Enum(DriverStatus), default=DriverStatus.AVAILABLE, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    trips = relationship("Trip", back_populates="driver")


# ---------------------------------------------------------------------------
# PERSON B — Trip Management + business rule engine
# ---------------------------------------------------------------------------

class Trip(Base):
    __tablename__ = "trips"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    source = Column(String, nullable=False)
    destination = Column(String, nullable=False)

    vehicle_id = Column(UUID(as_uuid=False), ForeignKey("vehicles.id"), nullable=False)
    driver_id = Column(UUID(as_uuid=False), ForeignKey("drivers.id"), nullable=False)

    cargo_weight_kg = Column(Float, nullable=False)
    planned_distance_km = Column(Float, nullable=False)

    final_odometer = Column(Float, nullable=True)      # filled on completion
    fuel_consumed_l = Column(Float, nullable=True)      # filled on completion

    status = Column(Enum(TripStatus), default=TripStatus.DRAFT, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    dispatched_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    cancelled_at = Column(DateTime, nullable=True)

    vehicle = relationship("Vehicle", back_populates="trips")
    driver = relationship("Driver", back_populates="trips")


# ---------------------------------------------------------------------------
# PERSON C — Maintenance, Fuel Logs, Expenses
# ---------------------------------------------------------------------------

class Maintenance(Base):
    __tablename__ = "maintenance_logs"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    vehicle_id = Column(UUID(as_uuid=False), ForeignKey("vehicles.id"), nullable=False)
    description = Column(String, nullable=False)  # e.g. "Oil Change"
    cost = Column(Float, default=0)
    status = Column(Enum(MaintenanceStatus), default=MaintenanceStatus.ACTIVE, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    closed_at = Column(DateTime, nullable=True)

    vehicle = relationship("Vehicle", back_populates="maintenance_logs")


class FuelLog(Base):
    __tablename__ = "fuel_logs"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    vehicle_id = Column(UUID(as_uuid=False), ForeignKey("vehicles.id"), nullable=False)
    liters = Column(Float, nullable=False)
    cost = Column(Float, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)

    vehicle = relationship("Vehicle", back_populates="fuel_logs")


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(UUID(as_uuid=False), primary_key=True, default=gen_uuid)
    vehicle_id = Column(UUID(as_uuid=False), ForeignKey("vehicles.id"), nullable=False)
    category = Column(String, nullable=False)  # e.g. Toll, Maintenance, Other
    amount = Column(Float, nullable=False)
    date = Column(DateTime, default=datetime.utcnow)
    notes = Column(Text, nullable=True)

    vehicle = relationship("Vehicle", back_populates="expenses")