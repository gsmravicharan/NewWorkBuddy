import React from 'react';
import Sidebar from '../components/Sidebar';

const stats = [
  { id: 1, label: 'Open Requests', value: 12 },
  { id: 2, label: 'Completed', value: 245 },
  { id: 3, label: 'Active Services', value: 4 },
];

const requests = [
  { id: 1, title: 'Fix AC unit', customer: 'Alice', status: 'Pending' },
  { id: 2, title: 'Plumbing check', customer: 'Bob', status: 'In Progress' },
  { id: 3, title: 'Install heater', customer: 'Carol', status: 'Pending' },
];

const WorkerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="md:flex">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-1 p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold">Worker Dashboard</h1>
            <p className="text-sm text-gray-600">Overview of your requests and active services</p>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {stats.map((s) => (
              <div key={s.id} className="bg-white p-4 rounded shadow">
                <div className="text-sm text-gray-500">{s.label}</div>
                <div className="text-2xl font-bold mt-2">{s.value}</div>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded shadow p-4">
              <h2 className="font-semibold mb-3">Requests</h2>
              <ul className="space-y-3">
                {requests.map((r) => (
                  <li key={r.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <div className="font-medium">{r.title}</div>
                      <div className="text-sm text-gray-500">{r.customer}</div>
                    </div>
                    <div className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">{r.status}</div>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="bg-white rounded shadow p-4">
              <h3 className="font-semibold mb-3">Active Services</h3>
              <div className="space-y-3">
                <div className="p-3 border rounded">
                  <div className="font-medium">AC Maintenance</div>
                  <div className="text-sm text-gray-500">Next visit: 3 days</div>
                </div>
                <div className="p-3 border rounded">
                  <div className="font-medium">Plumbing Support</div>
                  <div className="text-sm text-gray-500">Active</div>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WorkerDashboard;
