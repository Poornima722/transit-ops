import DashboardLayout from "../../layouts/DashboardLayout";

export default function Dashboard() {
  const cards = [
    { title: "Active Vehicles", value: 24 },

    { title: "Drivers", value: 18 },

    { title: "Trips", value: 31 },

    { title: "Maintenance", value: 4 },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6">
        {cards.map((card) => (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500">{card.title}</h2>

            <p className="text-4xl font-bold mt-4">{card.value}</p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
