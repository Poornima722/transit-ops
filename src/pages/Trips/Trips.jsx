import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import TripHeader from "../../components/trip/TripHeader";
import TripTable from "../../components/trip/TripTable";
import TripModal from "../../components/trip/TripModal";

import { getTrips, createTrip } from "../../services/tripService";

export default function Trips() {
  const [showModal, setShowModal] = useState(false);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTrip = async (trip) => {
    try {
      const newTrip = await createTrip(trip);

      // Backend already returns the full trip with nested vehicle & driver
      setTrips((prev) => [...prev, newTrip]);

      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Unable to create trip.");
    }
  };

  return (
    <DashboardLayout>
      <TripHeader onAdd={() => setShowModal(true)} />

      <TripTable trips={trips} />

      {showModal && (
        <TripModal
          onClose={() => setShowModal(false)}
          onSave={handleCreateTrip}
        />
      )}
    </DashboardLayout>
  );
}
