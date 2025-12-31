import React, { useEffect, useState } from 'react';

const CustomerProfile = () => {
  const stored = JSON.parse(localStorage.getItem('wc_customer')) || null;

  const [user, setUser] = useState(
    stored || { name: 'Jane Customer', email: 'customer@example.com', contact: '9123456780', services: [{ id: 1, name: 'Home Cleaning', status: 'Active' }] }
  );

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', contact: '' });

  useEffect(() => {
    setForm({ name: user.name, email: user.email, contact: user.contact });
  }, [user]);

  const saveProfile = () => {
    const updated = { ...user, name: form.name, email: form.email, contact: form.contact };
    setUser(updated);
    localStorage.setItem('wc_customer', JSON.stringify(updated));
    setEditing(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Customer Profile</h1>
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

        <section className="space-y-4">
          <div>
            <div className="text-sm text-gray-500">Name</div>
            {!editing ? <div className="font-medium">{user.name}</div> : <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border rounded px-3 py-2" />}
          </div>

          <div>
            <div className="text-sm text-gray-500">Email</div>
            {!editing ? <div className="font-medium">{user.email}</div> : <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border rounded px-3 py-2" />}
          </div>

          <div>
            <div className="text-sm text-gray-500">Contact</div>
            {!editing ? <div className="font-medium">{user.contact}</div> : <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="w-full border rounded px-3 py-2" />}
          </div>

          <div>
            <h2 className="font-semibold">Services</h2>
            <div className="mt-3 grid grid-cols-1 gap-3">
              {user.services.map((s) => (
                <div key={s.id} className="p-3 border rounded flex items-center justify-between">
                  <div>
                    <div className="font-medium">{s.name}</div>
                    {s.status && <div className="text-sm text-gray-500">{s.status}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomerProfile;
