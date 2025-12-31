import { useContext } from 'react';
import RequestsContext from '../context/RequestsContext';

export default function useRequests() {
  const ctx = useContext(RequestsContext);
  if (!ctx) throw new Error('useRequests must be used within a RequestsProvider');
  return ctx;
}
