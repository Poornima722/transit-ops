import TripRow from "./TripRow";

const trips = [
  {
    source: "Bangalore",
    destination: "Mysore",
    vehicle: "KA01AB1234",
    driver: "Alex Kumar",
    weight: 500,
    distance: 145,
    status: "Draft",
  },

  {
    source: "Bangalore",
    destination: "Hubli",
    vehicle: "KA05CD5678",
    driver: "Rahul Sharma",
    weight: 900,
    distance: 410,
    status: "Dispatched",
  },

  {
    source: "Tumkur",
    destination: "Mangalore",
    vehicle: "KA03EF1111",
    driver: "Priya Singh",
    weight: 700,
    distance: 320,
    status: "Completed",
  },
];

export default function TripTable() {
  return (
    <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Source</th>

            <th>Destination</th>

            <th>Vehicle</th>

            <th>Driver</th>

            <th>Weight</th>

            <th>Distance</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {trips.map((trip) => (
            <TripRow key={trip.vehicle} trip={trip} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
