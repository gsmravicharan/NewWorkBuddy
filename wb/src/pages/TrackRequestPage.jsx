import React, { useState } from 'react';
import RequestDetailsModal from '../components/RequestDetailsModal';

const mockRequests = [
  { id: 1, title: 'Fix AC unit', status: 'Scheduled', assignedTo: 'John', description: 'AC not cooling properly', category: 'AC' },
  { id: 2, title: 'Kitchen sink leak', status: 'In Progress', assignedTo: 'Mike', description: 'Leaking pipe under sink', category: 'Plumbing' },
  { id: 3, title: 'Full home cleaning', status: 'Completed', assignedTo: 'CleanCo', description: 'Monthly deep clean', category: 'Cleaning' },
];

const statusColor = (s) => {
  if (s === 'Completed') return 'bg-green-100 text-green-800';
  if (s === 'In Progress') return 'bg-yellow-100 text-yellow-800';
  return 'bg-blue-100 text-blue-800';
};

const TrackRequestPage = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Track My Requests</h1>
        <p className="text-sm text-gray-600">View status of your service requests</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {mockRequests.map((r) => (
          <div key={r.id} className="bg-white rounded shadow p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{r.title}</div>
              <div className="text-sm text-gray-500">Assigned to: {r.assignedTo}</div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`px-3 py-1 rounded-full text-sm ${statusColor(r.status)}`}>{r.status}</div>
              <button onClick={() => setSelected(r)} className="px-3 py-1 bg-blue-600 text-white rounded">Details</button>
            </div>
          </div>
        ))}
      </div>

      <RequestDetailsModal isOpen={!!selected} onClose={() => setSelected(null)} service={selected} />
    </div>
  );
};

export default TrackRequestPage;
