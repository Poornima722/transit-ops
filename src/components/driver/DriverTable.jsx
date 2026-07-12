import DriverRow from "./DriverRow";

export default function DriverTable({ drivers }) {
  return (
    <div className="bg-white rounded-xl shadow mt-8 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-4">Name</th>

            <th>License</th>

            <th>Category</th>

            <th>Phone</th>

            <th>Safety Score</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {drivers.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center p-8 text-gray-500">
                No Drivers Found
              </td>
            </tr>
          ) : (
            drivers.map((driver, index) => (
              <DriverRow key={driver.license || index} driver={driver} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
