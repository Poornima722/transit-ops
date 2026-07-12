import React, { useMemo, useState } from 'react';

const mockVehicles = [
  { id: 'V001', name: 'Transit 101' },
  { id: 'V002', name: 'Route 22' },
  { id: 'V003', name: 'Express 3' },
];

function ExpenseManager() {
  const [activeTab, setActiveTab] = useState('fuel');
  const [fuelData, setFuelData] = useState({ vehicle_id: 'V001', liters: '', cost: '' });
  const [expenseData, setExpenseData] = useState({ vehicle_id: 'V001', category: 'Toll', amount: '', notes: '' });
  const [selectedVehicle, setSelectedVehicle] = useState('V001');
  const [fuelEntries, setFuelEntries] = useState([
    { vehicle_id: 'V001', liters: 45, cost: 130 },
    { vehicle_id: 'V002', liters: 32, cost: 90 },
  ]);
  const [generalEntries, setGeneralEntries] = useState([
    { vehicle_id: 'V001', category: 'Maintenance', amount: 210, notes: 'Brake pads replacement' },
    { vehicle_id: 'V002', category: 'Toll', amount: 18, notes: 'Harbor bridge' },
    { vehicle_id: 'V003', category: 'Other', amount: 55, notes: 'Cleaning supplies' },
  ]);

  const handleFuelSubmit = (event) => {
    event.preventDefault();
    const entry = {
      vehicle_id: fuelData.vehicle_id,
      liters: Number(fuelData.liters),
      cost: Number(fuelData.cost),
    };
    setFuelEntries((prev) => [...prev, entry]);
    setFuelData({ ...fuelData, liters: '', cost: '' });
  };

  const handleExpenseSubmit = (event) => {
    event.preventDefault();
    const entry = {
      vehicle_id: expenseData.vehicle_id,
      category: expenseData.category,
      amount: Number(expenseData.amount),
      notes: expenseData.notes,
    };
    setGeneralEntries((prev) => [...prev, entry]);
    setExpenseData({ ...expenseData, amount: '', notes: '' });
  };

  const summary = useMemo(() => {
    const filteredFuel = fuelEntries.filter((entry) => entry.vehicle_id === selectedVehicle);
    const filteredExpenses = generalEntries.filter((entry) => entry.vehicle_id === selectedVehicle);
    const fuelCosts = filteredFuel.reduce((sum, entry) => sum + entry.cost, 0);
    const maintenanceTotal = filteredExpenses
      .filter((entry) => entry.category === 'Maintenance')
      .reduce((sum, entry) => sum + entry.amount, 0);
    const generalCosts = filteredExpenses
      .filter((entry) => entry.category !== 'Maintenance')
      .reduce((sum, entry) => sum + entry.amount, 0);
    return {
      fuelCosts,
      generalCosts,
      maintenanceTotal,
      totalRunningCost: fuelCosts + generalCosts + maintenanceTotal,
    };
  }, [fuelEntries, generalEntries, selectedVehicle]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Expense Manager</h1>
            <p className="mt-1 text-sm text-slate-500">Log fuel purchases, general expenses, and review vehicle running costs.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('fuel')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === 'fuel'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Fuel Purchase
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('expense')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === 'expense'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              General Expense
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('summary')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === 'summary'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Summary
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            {activeTab === 'fuel' && (
              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Log Fuel Purchase</h2>
                <form onSubmit={handleFuelSubmit} className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Vehicle
                    <select
                      value={fuelData.vehicle_id}
                      onChange={(e) => setFuelData({ ...fuelData, vehicle_id: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    >
                      {mockVehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Liters
                    <input
                      type="number"
                      value={fuelData.liters}
                      onChange={(e) => setFuelData({ ...fuelData, liters: e.target.value })}
                      placeholder="Enter liters"
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Cost
                    <input
                      type="number"
                      value={fuelData.cost}
                      onChange={(e) => setFuelData({ ...fuelData, cost: e.target.value })}
                      placeholder="Enter cost"
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Save Fuel Purchase
                  </button>
                </form>
              </section>
            )}

            {activeTab === 'expense' && (
              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Log General Expense</h2>
                <form onSubmit={handleExpenseSubmit} className="space-y-4">
                  <label className="block text-sm font-medium text-slate-700">
                    Vehicle
                    <select
                      value={expenseData.vehicle_id}
                      onChange={(e) => setExpenseData({ ...expenseData, vehicle_id: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    >
                      {mockVehicles.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id}>
                          {vehicle.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Category
                    <select
                      value={expenseData.category}
                      onChange={(e) => setExpenseData({ ...expenseData, category: e.target.value })}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    >
                      <option value="Toll">Toll</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Amount
                    <input
                      type="number"
                      value={expenseData.amount}
                      onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
                      placeholder="Enter amount"
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Notes
                    <textarea
                      value={expenseData.notes}
                      onChange={(e) => setExpenseData({ ...expenseData, notes: e.target.value })}
                      placeholder="Add notes"
                      rows={4}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Save General Expense
                  </button>
                </form>
              </section>
            )}

            {activeTab === 'summary' && (
              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <h2 className="mb-4 text-xl font-semibold text-slate-900">Financial Summary</h2>
                <label className="block text-sm font-medium text-slate-700">
                  Select vehicle
                  <select
                    value={selectedVehicle}
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                  >
                    {mockVehicles.map((vehicle) => (
                      <option key={vehicle.id} value={vehicle.id}>
                        {vehicle.name}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-wide text-slate-500">Fuel Costs</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">${summary.fuelCosts.toFixed(2)}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-wide text-slate-500">General Expenses</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">${summary.generalCosts.toFixed(2)}</p>
                  </div>
                  <div className="rounded-3xl bg-white p-5 shadow-sm sm:col-span-2">
                    <p className="text-sm uppercase tracking-wide text-slate-500">Maintenance</p>
                    <p className="mt-3 text-3xl font-semibold text-slate-900">${summary.maintenanceTotal.toFixed(2)}</p>
                  </div>
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm">
              <p className="text-sm uppercase tracking-wide text-slate-300">Total Running Cost</p>
              <p className="mt-3 text-4xl font-semibold text-white">${summary.totalRunningCost.toFixed(2)}</p>
              <p className="mt-4 text-sm text-slate-300">
                Calculated as fuel + general expenses + maintenance for the selected vehicle.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">Quick Stats</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <p>Fuel entries: {fuelEntries.filter((entry) => entry.vehicle_id === selectedVehicle).length}</p>
                <p>Expense entries: {generalEntries.filter((entry) => entry.vehicle_id === selectedVehicle).length}</p>
                <p>Active vehicle: {mockVehicles.find((vehicle) => vehicle.id === selectedVehicle)?.name}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ExpenseManager;

