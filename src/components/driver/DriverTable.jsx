import DriverRow from "./DriverRow";

const drivers = [
  {
    name: "Alex Kumar",
    license: "DL123456",
    category: "LMV",
    phone: "9876543210",
    score: 95,
    status: "Available",
  },

  {
    name: "Rahul Sharma",
    license: "KA765432",
    category: "HMV",
    phone: "9876543211",
    score: 88,
    status: "On Trip",
  },

  {
    name: "Priya Singh",
    license: "KA888999",
    category: "LMV",
    phone: "9876543212",
    score: 92,
    status: "Off Duty",
  },

  {
    name: "John Peter",
    license: "KA555444",
    category: "HMV",
    phone: "9876543213",
    score: 70,
    status: "Suspended",
  },
];

export default function DriverTable() {
  return (
    <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Name</th>

            <th>License</th>

            <th>Category</th>

            <th>Phone</th>

            <th>Safety</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver) => (
            <DriverRow key={driver.license} driver={driver} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
