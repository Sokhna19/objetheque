'use client';

import { useState } from 'react';
import { createBorrowing } from '@/actions';

interface BorrowFormProps {
  objectId: string;
}

export default function BorrowForm({ objectId }: BorrowFormProps) {
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('objectId', objectId);
      formData.append('startDate', startDate);
      formData.append('days', days.toString());
      await createBorrowing(formData);
      alert('Emprunt enregistré avec succès!');
      // Optionally refresh the page or update state
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'emprunt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-medium mb-2">Emprunter cet objet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium">Date de début</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="days" className="block text-sm font-medium">Nombre de jours</label>
          <input
            type="number"
            id="days"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            min={1}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Enregistrement...' : 'Emprunter'}
        </button>
      </form>
    </div>
  );
}