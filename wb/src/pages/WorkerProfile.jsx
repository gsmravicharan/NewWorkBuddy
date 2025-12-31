import React, { useEffect, useState } from 'react';

const WorkerProfile = () => {
  const stored = JSON.parse(localStorage.getItem('wc_user')) || null;

  const [user, setUser] = useState(
    stored || {
      name: 'John Worker',
      email: 'worker@example.com',
      contact: '9876543210',
      services: [
        { id: 1, name: 'AC Repair', price: 500 },
        { id: 2, name: 'Plumbing Check', price: 300 },
      ],
    }
  );

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', contact: '' });

  const [newService, setNewService] = useState({ name: '', price: '' });

  useEffect(() => {
    setForm({ name: user.name, email: user.email, contact: user.contact });
  }, [user]);

  const saveProfile = () => {
    const updated = { ...user, name: form.name, email: form.email, contact: form.contact };
    setUser(updated);
    localStorage.setItem('wc_user', JSON.stringify(updated));
    setEditing(false);
  };

  const addService = () => {
    if (!newService.name.trim()) return;
    const s = { id: Date.now(), name: newService.name.trim(), price: Number(newService.price) || 0 };
    const updated = { ...user, services: [s, ...user.services] };
    setUser(updated);
    localStorage.setItem('wc_user', JSON.stringify(updated));
    setNewService({ name: '', price: '' });
  };

  const deleteService = (id) => {
    const updated = { ...user, services: user.services.filter((s) => s.id !== id) };
    setUser(updated);
    localStorage.setItem('wc_user', JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Worker Profile</h1>
          <div>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="px-3 py-1 bg-blue-600 text-white rounded">Edit</button>
            ) : (
              <>
                <button onClick={saveProfile} className="px-3 py-1 bg-green-600 text-white rounded mr-2">Save</button>
                <button onClick={() => setEditing(false)} className="px-3 py-1 bg-gray-100 rounded">Cancel</button>
              </>
            )}
          </div>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="mb-4">
              <div className="text-sm text-gray-500">Name</div>
              {!editing ? (
                <div className="font-medium">{user.name}</div>
              ) : (
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2" />
              )}
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-500">Email</div>
              {!editing ? (
                <div className="font-medium">{user.email}</div>
              ) : (
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded px-3 py-2" />
              )}
            </div>

            <div>
              <div className="text-sm text-gray-500">Contact</div>
              {!editing ? (
                <div className="font-medium">{user.contact}</div>
              ) : (
                <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="w-full border rounded px-3 py-2" />
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-semibold">Services</h2>
              <div className="text-sm text-gray-500">Manage services you offer</div>
            </div>

            <div className="mb-4 flex gap-2">
              <input placeholder="Service name" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} className="flex-1 border rounded px-3 py-2" />
              <input placeholder="Price" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} className="w-32 border rounded px-3 py-2" />
              <button onClick={addService} className="px-3 py-2 bg-blue-600 text-white rounded">Add</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {user.services.map((s) => (
                <div key={s.id} className="p-3 border rounded flex items-center justify-between">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    <div className="text-sm text-gray-500">Price: ₹{s.price}</div>
                  </div>
                  <button onClick={() => deleteService(s.id)} className="text-red-600">Delete</button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WorkerProfile;
