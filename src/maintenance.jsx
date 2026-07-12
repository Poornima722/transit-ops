import React, { useState } from 'react';

const emptyForm = {
  vehicleId: '',
  description: '',
  cost: '',
  entryDate: new Date().toISOString().slice(0, 10),
};

export default function MaintenanceManager({ vehicles = [], initialMaintenanceLogs = [] }) {
  const [form, setForm] = useState(emptyForm);
  const [logs, setLogs] = useState(initialMaintenanceLogs);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const availableVehicles = vehicles.filter((vehicle) => {
    const status = typeof vehicle.status === 'string' ? vehicle.status.toLowerCase() : '';
    return status === '' || status === 'available';
  });

  const activeLogs = logs.filter((log) => {
    const status = typeof log.status === 'string' ? log.status.toLowerCase() : '';
    return status !== 'closed';
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.vehicleId || !form.description || !form.cost || !form.entryDate) {
      setFeedback({ type: 'error', message: 'Please fill out every field before submitting.' });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: '', message: '' });

    try {
      const response = await fetch('/api/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle_id: form.vehicleId,
          description: form.description,
          cost: Number(form.cost),
          entry_date: form.entryDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to create maintenance log.');
      }

      const newLog = data.maintenance || {
        id: Date.now(),
        vehicle_id: form.vehicleId,
        description: form.description,
        cost: Number(form.cost),
        entry_date: form.entryDate,
        status: 'Open',
      };

      setLogs((prev) => [newLog, ...prev]);
      setForm(emptyForm);
      setFeedback({ type: 'success', message: 'Maintenance entry added successfully.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Something went wrong.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = async (id) => {
    try {
      const response = await fetch(`/api/maintenance/${id}/close`, {
        method: 'PUT',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to close maintenance log.');
      }

      setLogs((prev) => prev.filter((log) => log.id !== id));
      setFeedback({ type: 'success', message: 'Maintenance marked as closed.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Something went wrong.' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-600">Fleet operations</p>
              <h1 className="text-2xl font-semibold text-slate-900">Vehicle maintenance manager</h1>
              <p className="mt-1 text-sm text-slate-600">
                Create service entries and close them as soon as work is complete.
              </p>
            </div>
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

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Vehicle</label>
              <select
                name="vehicleId"
                value={form.vehicleId}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:bg-white"
              >
                <option value="">Select an available vehicle</option>
                {availableVehicles.map((vehicle) => (
                  <option key={vehicle.id} value={vehicle.id}>
                    {vehicle.label || `Vehicle ${vehicle.id}`}
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
                placeholder="Describe the maintenance issue or service performed"
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

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Entry date</label>
              <input
                type="date"
                name="entryDate"
                value={form.entryDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:bg-white"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? 'Saving...' : 'Log maintenance'}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Active maintenance logs</h2>
              <p className="text-sm text-slate-600">Open work orders currently in progress.</p>
            </div>
          </div>

          {activeLogs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
              There are no active maintenance entries right now.
            </div>
          ) : (
            <div className="space-y-3">
              {activeLogs.map((log) => (
                <div key={log.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">Vehicle #{log.vehicle_id}</span>
                        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                          Open
                        </span>
                      </div>
                      <p className="text-sm text-slate-700">{log.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <span>Cost: ${Number(log.cost || 0).toFixed(2)}</span>
                        <span>Date: {log.entry_date || log.entryDate || '—'}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleClose(log.id)}
                      className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                    >
                      Close Maintenance
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
