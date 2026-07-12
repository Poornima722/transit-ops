import DashboardLayout from "../../layouts/DashboardLayout";

export default function Trips() {
  const trips = [
    {
      id: "TR001",
      source: "Bangalore",
      destination: "Mysore",
      vehicle: "KA01AB1234",
      driver: "Ramesh Kumar",
      status: "Dispatched",
    },
    {
      id: "TR002",
      source: "Hubli",
      destination: "Belgaum",
      vehicle: "KA05CD5678",
      driver: "Suresh Rao",
      status: "Completed",
    },
    {
      id: "TR003",
      source: "Tumkur",
      destination: "Hassan",
      vehicle: "KA03EF1111",
      driver: "Mahesh Gowda",
      status: "Draft",
    },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold">Trip Management</h1>

      <p className="text-gray-500 mb-8">Monitor and dispatch trips</p>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Trip ID</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr key={trip.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{trip.id}</td>
                <td>{trip.source}</td>
                <td>{trip.destination}</td>
                <td>{trip.vehicle}</td>
                <td>{trip.driver}</td>
                <td>{trip.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
