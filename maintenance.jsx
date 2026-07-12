import React, { useState } from 'react';

const mockVehicles = [
  { id: 'V-101', registration_number: 'ABC-123' },
  { id: 'V-102', registration_number: 'XYZ-789' },
  { id: 'V-103', registration_number: 'LMN-456' },
];

const mockLogs = [
  {
    id: 1,
    vehicle_id: 'V-101',
    description: 'Brake inspection and replacement',
    cost: '120.00',
    status: 'ACTIVE',
  },
  {
    id: 2,
    vehicle_id: 'V-103',
    description: 'Oil change and tire rotation',
    cost: '85.50',
    status: 'ACTIVE',
  },
];

const emptyForm = {
  vehicle_id: '',
  description: '',
  cost: '',
};

export default function MaintenanceManager() {
  const [form, setForm] = useState(emptyForm);
  const [logs, setLogs] = useState(mockLogs);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeLogs = logs.filter((log) => log.status === 'ACTIVE');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSubmit = async (event) => {
    event.preventDefault();

    if (!form.vehicle_id || !form.description || !form.cost) {
      setFeedback({ type: 'error', message: 'Please complete the form before saving.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: '', message: '' });

    const payload = {
      vehicle_id: form.vehicle_id,
      description: form.description,
      cost: Number(form.cost),
    };

    try {
      await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.warn('POST placeholder failed, using local mock state.', error);
    }

    setLogs((prev) => [
      {
        id: Date.now(),
        ...payload,
        status: 'ACTIVE',
      },
      ...prev,
    ]);

    setForm({ ...emptyForm });
    setFeedback({ type: 'success', message: 'Maintenance entry added successfully.' });
    setIsSubmitting(false);
  };

  const handleCloseClick = async (id) => {
    try {
      await fetch(`/api/maintenance/${id}/close`, {
        method: 'PUT',
      });
    } catch (error) {
      console.warn('PUT placeholder failed, using local mock state.', error);
    }

    setLogs((prev) => prev.filter((log) => log.id !== id));
    setFeedback({ type: 'success', message: 'Maintenance entry closed.' });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Fleet operations</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">Maintenance manager</h1>
            <p className="mt-2 text-sm text-slate-600">
              Log new work orders and close active maintenance tasks from one place.
            </p>
          </div>

          {feedback.message ? (
            <div
              className={`mb-4 rounded-xl border px-4 py-3 text-sm ${
                feedback.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-rose-200 bg-rose-50 text-rose-700'
              }`}
            >
              {feedback.message}
            </div>
          ) : null}

          <form onSubmit={handleCreateSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Vehicle</label>
              <select
                name="vehicle_id"
                value={form.vehicle_id}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:bg-white"
              >
                <option value="">Select a vehicle</option>
                {mockVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.id} — {vehicle.registration_number}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the maintenance work"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Cost</label>
              <input
                type="number"
                name="cost"
                min="0"
                step="0.01"
                value={form.cost}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div className="flex items-end justify-start md:justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
              >
                {isSubmitting ? 'Saving...' : 'Log Maintenance'}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Active maintenance logs</h2>
            <p className="text-sm text-slate-600">Current issues marked as active.</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Vehicle ID</th>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 font-medium">Cost</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {activeLogs.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-4 py-6 text-center text-slate-500">
                      No active maintenance logs.
                    </td>
                  </tr>
                ) : (
                  activeLogs.map((log) => (
                    <tr key={log.id} className="align-top">
                      <td className="px-4 py-3 font-medium text-slate-900">{log.vehicle_id}</td>
                      <td className="px-4 py-3 text-slate-700">{log.description}</td>
                      <td className="px-4 py-3 text-slate-700">${Number(log.cost || 0).toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => handleCloseClick(log.id)}
                          className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                        >
                          Close Maintenance
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
