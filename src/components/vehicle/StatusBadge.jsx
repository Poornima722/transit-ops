export default function StatusBadge({ status }) {
  const styles = {
    Available: "bg-green-100 text-green-700",
    "On Trip": "bg-blue-100 text-blue-700",
    "In Shop": "bg-orange-100 text-orange-700",
    Retired: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
