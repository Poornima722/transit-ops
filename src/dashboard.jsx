import React, { useState } from 'react'

const Badge = ({ color, children }) => {
  const base = 'text-xs font-semibold px-2 py-1 rounded-full'
  const colors = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
  }
  return <span className={`${base} ${colors[color] || colors.green}`}>{children}</span>
}

export default function ExecutiveDashboard() {
  const initial = {
    fleetUtilization: 78, // percent
    activeVehicles: 156,
    totalFleet: 200,
    inShop: 12,
    statusCounts: {
      available: 32,
      onTrip: 156,
      inShop: 12,
    },
    runningCost: 48250,
    costBreakdown: {
      fuel: 22000,
      maintenance: 15000,
      general: 11250,
    },
  }

  const [data, setData] = useState(initial)

  const formatCurrency = (n) => n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  const refresh = () => {
    // simple simulation: random small deltas
    const rand = (v, pct = 0.08) => Math.max(0, Math.round(v * (1 + (Math.random() - 0.5) * pct * 2)))

    const totalFleet = initial.totalFleet
    const activeVehicles = Math.min(totalFleet, rand(data.activeVehicles, 0.2))
    const inShop = Math.min(totalFleet - activeVehicles, rand(data.inShop, 0.5))
    const fleetUtilization = Math.round((activeVehicles / totalFleet) * 100)
    const runningCost = rand(data.runningCost, 0.12)
    const costBreakdown = {
      fuel: Math.round(runningCost * (0.45 + (Math.random() - 0.5) * 0.1)),
      maintenance: Math.round(runningCost * (0.31 + (Math.random() - 0.5) * 0.08)),
      general: 0,
    }
    costBreakdown.general = runningCost - costBreakdown.fuel - costBreakdown.maintenance

    setData({
      ...data,
      fleetUtilization,
      activeVehicles,
      totalFleet,
      inShop,
      statusCounts: {
        available: Math.max(0, totalFleet - activeVehicles - inShop),
        onTrip: activeVehicles,
        inShop,
      },
      runningCost,
      costBreakdown,
    })
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Executive Dashboard</h1>
          <div>
            <button
              onClick={refresh}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-500"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-gray-500">Fleet Utilization</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">{data.fleetUtilization}%</span>
                  <span className="ml-3 text-sm text-gray-500">of {data.totalFleet} fleet</span>
                </div>
              </div>
              <div className="text-right">
                <Badge color={data.fleetUtilization > 75 ? 'green' : data.fleetUtilization > 50 ? 'yellow' : 'red'}>
                  {data.fleetUtilization > 75 ? 'Healthy' : data.fleetUtilization > 50 ? 'Moderate' : 'Low'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Active Vehicles</h3>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{data.activeVehicles}</div>
                <div className="text-sm text-gray-500">of {data.totalFleet}</div>
              </div>
              <div className="space-y-2 text-right">
                <Badge color="green">Available {data.statusCounts.available}</Badge>
                <Badge color="yellow">On Trip {data.statusCounts.onTrip}</Badge>
                <Badge color="red">In Shop {data.statusCounts.inShop}</Badge>
              </div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">In-Shop Vehicles</h3>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <div className="text-2xl font-semibold text-gray-900">{data.inShop}</div>
                <div className="text-sm text-gray-500">under maintenance</div>
              </div>
              <div>
                <Badge color={data.inShop > 10 ? 'red' : data.inShop > 3 ? 'yellow' : 'green'}>
                  {data.inShop > 10 ? 'High' : data.inShop > 3 ? 'Medium' : 'Low'}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm text-gray-500">Total Fleet Running Cost</h3>
                <div className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(data.runningCost)}</div>
              </div>
              <div className="text-sm text-gray-500">Month-to-date</div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">Fuel</div>
                <div className="mt-1 font-semibold text-gray-800">{formatCurrency(data.costBreakdown.fuel)}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">Maintenance</div>
                <div className="mt-1 font-semibold text-gray-800">{formatCurrency(data.costBreakdown.maintenance)}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-gray-500">General Expenses</div>
                <div className="mt-1 font-semibold text-gray-800">{formatCurrency(data.costBreakdown.general)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500">Cost Share</h3>
            <div className="mt-4 space-y-3">
              {Object.entries(data.costBreakdown).map(([key, val]) => {
                const pct = Math.round((val / data.runningCost) * 100)
                const color = key === 'fuel' ? 'bg-green-400' : key === 'maintenance' ? 'bg-yellow-400' : 'bg-blue-400'
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="capitalize">{key}</div>
                      <div className="font-semibold">{pct}%</div>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded mt-2">
                      <div className={`${color} h-2 rounded`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
