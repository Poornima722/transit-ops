import React, { useState } from 'react';

const FleetReports = () => {
  const [activeTab, setActiveTab] = useState('fuel');

  const [fuelData] = useState([
    {
      vehicleId: 'TR-1024',
      totalLiters: 1240,
      totalSpend: 1890,
      fillUps: 18,
      avgLiters: 68.9,
    },
    {
      vehicleId: 'BD-7802',
      totalLiters: 860,
      totalSpend: 1310,
      fillUps: 14,
      avgLiters: 61.4,
    },
    {
      vehicleId: 'MX-4410',
      totalLiters: 1535,
      totalSpend: 2320,
      fillUps: 22,
      avgLiters: 69.8,
    },
    {
      vehicleId: 'FS-2139',
      totalLiters: 720,
      totalSpend: 1088,
      fillUps: 11,
      avgLiters: 65.5,
    },
  ]);

  const [financialData] = useState([
    {
      vehicleId: 'TR-1024',
      operationalExpenses: 4320,
      estimatedRevenue: 6800,
      netProfit: 2480,
      roi: 57.4,
    },
    {
      vehicleId: 'BD-7802',
      operationalExpenses: 3250,
      estimatedRevenue: 5200,
      netProfit: 1950,
      roi: 60.0,
    },
    {
      vehicleId: 'MX-4410',
      operationalExpenses: 5050,
      estimatedRevenue: 8650,
      netProfit: 3600,
      roi: 71.3,
    },
    {
      vehicleId: 'FS-2139',
      operationalExpenses: 2870,
      estimatedRevenue: 4100,
      netProfit: 1230,
      roi: 42.9,
    },
  ]);

  const mostProfitable = financialData.reduce((top, item) => {
    return item.netProfit > top.netProfit ? item : top;
  }, financialData[0]);

  const exportCsv = () => {
    alert('Export CSV action triggered.');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Fleet Reports</h1>
            <p className="mt-2 text-sm text-slate-600">
              View fuel consumption and ROI analytics for your active fleet in one polished dashboard.
            </p>
          </div>
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            Export CSV
          </button>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_80px_-40px_rgba(15,23,42,0.2)] ring-1 ring-slate-200">
          <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-4">
            <button
              type="button"
              onClick={() => setActiveTab('fuel')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === 'fuel'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Fuel Efficiency Report
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('financial')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeTab === 'financial'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Financial ROI Analytics
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'fuel' ? (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-xl font-semibold text-slate-900">Fuel Efficiency Overview</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Monitor consumption and spending trends across your fleet to identify vehicles with high usage.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="px-6 py-4 font-medium">Vehicle ID</th>
                        <th className="px-6 py-4 font-medium">Total Liters Consumed</th>
                        <th className="px-6 py-4 font-medium">Total Fuel Spend</th>
                        <th className="px-6 py-4 font-medium">Fill-ups Count</th>
                        <th className="px-6 py-4 font-medium">Average Liters / Fill</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {fuelData.map((item) => {
                        const highConsumption = item.avgLiters > 66;
                        return (
                          <tr
                            key={item.vehicleId}
                            className={highConsumption ? 'bg-amber-50' : ''}
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">
                              {item.vehicleId}
                            </td>
                            <td className="px-6 py-4 text-slate-700">{item.totalLiters.toLocaleString()}</td>
                            <td className="px-6 py-4 text-slate-700">${item.totalSpend.toLocaleString()}</td>
                            <td className="px-6 py-4 text-slate-700">{item.fillUps}</td>
                            <td className={`px-6 py-4 font-medium ${highConsumption ? 'text-amber-700' : 'text-slate-700'}`}>
                              {item.avgLiters.toFixed(1)} L
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <h2 className="text-xl font-semibold text-slate-900">Financial ROI Analytics</h2>
                    <p className="mt-2 text-sm text-slate-600">
                      Analyze operational expenses, revenue, and profitability across every vehicle in your fleet.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Top performing vehicle</p>
                    <p className="mt-3 text-2xl font-semibold text-slate-900">{mostProfitable.vehicleId}</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Net Profit</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">${mostProfitable.netProfit.toLocaleString()}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">ROI</p>
                        <p className="mt-2 text-lg font-semibold text-slate-900">{mostProfitable.roi.toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-slate-200">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-950 text-white">
                      <tr>
                        <th className="px-6 py-4 font-medium">Vehicle ID</th>
                        <th className="px-6 py-4 font-medium">Total Operational Expenses</th>
                        <th className="px-6 py-4 font-medium">Estimated Revenue</th>
                        <th className="px-6 py-4 font-medium">Net Profit</th>
                        <th className="px-6 py-4 font-medium">ROI %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {financialData.map((item) => (
                        <tr key={item.vehicleId}>
                          <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-900">{item.vehicleId}</td>
                          <td className="px-6 py-4 text-slate-700">${item.operationalExpenses.toLocaleString()}</td>
                          <td className="px-6 py-4 text-slate-700">${item.estimatedRevenue.toLocaleString()}</td>
                          <td className="px-6 py-4 text-slate-700">${item.netProfit.toLocaleString()}</td>
                          <td className="px-6 py-4 font-semibold text-slate-900">{item.roi.toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetReports;
