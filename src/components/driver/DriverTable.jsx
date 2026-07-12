export default function DriverTable() {
  const drivers = [
    {
      name: "Ramesh Kumar",
      license: "KA123456",
      category: "LMV",
      phone: "+91 9876543210",
      score: 96,
      status: "Available",
    },

    {
      name: "Suresh Rao",
      license: "KA654321",
      category: "HMV",
      phone: "+91 9988776655",
      score: 91,
      status: "On Trip",
    },

    {
      name: "Mahesh Gowda",
      license: "KA987654",
      category: "Transport",
      phone: "+91 9876501234",
      score: 87,
      status: "Off Duty",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Driver</th>

            <th>License</th>

            <th>Category</th>

            <th>Phone</th>

            <th>Safety Score</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {drivers.map((driver, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-4">{driver.name}</td>

              <td>{driver.license}</td>

              <td>{driver.category}</td>

              <td>{driver.phone}</td>

              <td>{driver.score}</td>

              <td>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {driver.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
