import React, { createContext, useEffect, useState } from 'react';
import api from '../services/api';

const RequestsContext = createContext(null);

export const RequestsProvider = ({ children }) => {
  const [requests, setRequests] = useState(() => {
    try {
      const raw = localStorage.getItem('requests');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('requests', JSON.stringify(requests));
    } catch (e) {
      // ignore
    }
  }, [requests]);

  const fetchRequests = async () => {
    try {
      const res = await api.get('/requests');
      setRequests(res.data || []);
    } catch (err) {
      // keep local state if API fails
    }
  };

  const addRequest = async (payload) => {
    try {
      const res = await api.post('/requests', payload);
      const created = res?.data || payload;
      setRequests((p) => [created, ...p]);
      return created;
    } catch (err) {
      // fallback: create locally
      const created = { id: Date.now(), ...payload };
      setRequests((p) => [created, ...p]);
      return created;
    }
  };

  const updateRequest = async (id, updates) => {
    try {
      const res = await api.put(`/requests/${id}`, updates);
      const updated = res?.data || updates;
      setRequests((p) => p.map((r) => (r.id === id ? { ...r, ...updated } : r)));
      return updated;
    } catch (err) {
      setRequests((p) => p.map((r) => (r.id === id ? { ...r, ...updates } : r)));
      return updates;
    }
  };

  const removeRequest = async (id) => {
    try {
      await api.delete(`/requests/${id}`);
    } catch (err) {
      // ignore
    }
    setRequests((p) => p.filter((r) => r.id !== id));
  };

  return (
    <RequestsContext.Provider value={{ requests, setRequests, fetchRequests, addRequest, updateRequest, removeRequest }}>
      {children}
    </RequestsContext.Provider>
  );
};

export default RequestsContext;
