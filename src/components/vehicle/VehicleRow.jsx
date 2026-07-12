import { Pencil, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function VehicleRow({ vehicle }) {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="py-4">{vehicle.registration}</td>

      <td>{vehicle.model}</td>

      <td>{vehicle.type}</td>

      <td>{vehicle.capacity}</td>

      <td>{vehicle.odometer}</td>

      <td>{vehicle.cost}</td>

      <td>
        <StatusBadge status={vehicle.status} />
      </td>

      <td>
        <div className="flex gap-3">
          <button className="text-blue-600 hover:text-blue-800">
            <Pencil size={18} />
          </button>

          <button className="text-red-600 hover:text-red-800">
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
