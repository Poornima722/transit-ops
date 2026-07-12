export default function DriverRow({ driver }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-4">{driver.name}</td>

      <td>{driver.license}</td>

      <td>{driver.category}</td>

      <td>{driver.phone}</td>

      <td>{driver.score}</td>

      <td>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium
          ${
            driver.status === "Available"
              ? "bg-green-100 text-green-700"
              : driver.status === "On Trip"
                ? "bg-blue-100 text-blue-700"
                : driver.status === "Off Duty"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
          }`}
        >
          {driver.status}
        </span>
      </td>
    </tr>
  );
}
