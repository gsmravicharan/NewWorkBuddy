import React, { useMemo, useState } from 'react';
import RequestDetailsModal from '../components/RequestDetailsModal';

const mockServices = Array.from({ length: 22 }).map((_, i) => ({
  id: i + 1,
  title: `Service ${i + 1}`,
  name: `Service ${i + 1}`,
  category: ['Cleaning', 'Plumbing', 'AC', 'Electrical'][i % 4],
  price: (i + 1) * 100,
  description: `Detailed description for service ${i + 1}.`,
  features: ['Fast', 'Reliable', 'Certified'].slice(0, (i % 3) + 1),
}));

const BrowseServicesPage = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockServices.filter((s) => {
      const okQuery = q ? (s.title || s.name).toLowerCase().includes(q) : true;
      const okCat = category === 'all' ? true : s.category === category;
      return okQuery && okCat;
    });
  }, [query, category]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(page, pages);
  const start = (current - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Browse Services</h1>
        <p className="text-sm text-gray-600">Find services and view details</p>
      </header>

      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services..."
            className="border px-3 py-2 rounded w-64"
          />

          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="border px-3 py-2 rounded"
          >
            <option value="all">All Categories</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Plumbing">Plumbing</option>
            <option value="AC">AC</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500">Per page:</div>
          <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }} className="border px-2 py-1 rounded">
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pageItems.map((s) => (
          <div key={s.id} className="bg-white rounded shadow p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">{s.title}</div>
                <div className="text-sm text-gray-500">{s.category}</div>
              </div>
              <div className="text-lg font-semibold">₹{s.price}</div>
            </div>

            <p className="text-sm text-gray-600 mt-3 line-clamp-3">{s.description}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-gray-500">Features: {s.features.join(', ')}</div>
              <button onClick={() => setSelected(s)} className="px-3 py-1 bg-blue-600 text-white rounded">View</button>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing {start + 1}–{Math.min(start + perPage, total)} of {total}</div>

        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 border rounded" disabled={current === 1}>Previous</button>
          <div className="px-3 py-1">{current} / {pages}</div>
          <button onClick={() => setPage((p) => Math.min(pages, p + 1))} className="px-3 py-1 border rounded" disabled={current === pages}>Next</button>
        </div>
      </footer>

      <RequestDetailsModal isOpen={!!selected} onClose={() => setSelected(null)} service={selected} />
    </div>
  );
};

export default BrowseServicesPage;
