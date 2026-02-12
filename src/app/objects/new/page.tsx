'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Options {
  categories: string[];
  subCategories: string[];
  shelves: string[];
  users: { id: string; name: string | null; email: string }[];
}

export default function NewObjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subCategory: '',
    shelf: '',
    status: 'available', // Default to available
    isToGive: false,
    isRequestedMissing: false,
    proposerName: '',
    ownerType: 'kerLogettes', // 'kerLogettes' or 'proposer'
    contactEmail: '',
    contactPhoneFixed: '',
    contactPhoneMobile: '',
    contactPreference: 'tel', // 'tel', 'mail', 'sms'
  });
  const [options, setOptions] = useState<Options>({ categories: [], subCategories: [], shelves: [], users: [] });
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [showNewSubCategory, setShowNewSubCategory] = useState(false);
  const [showNewShelf, setShowNewShelf] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/options')
      .then(res => res.json())
      .then(setOptions);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === 'category') {
      setShowNewCategory(value === 'new');
      setFormData(prev => ({ ...prev, category: value === 'new' ? '' : value }));
    } else if (name === 'subCategory') {
      setShowNewSubCategory(value === 'new');
      setFormData(prev => ({ ...prev, subCategory: value === 'new' ? '' : value }));
    } else if (name === 'shelf') {
      setShowNewShelf(value === 'new');
      setFormData(prev => ({ ...prev, shelf: value === 'new' ? '' : value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name) {
      setError('Nom est obligatoire.');
      return;
    }

    if (formData.ownerType === 'proposer') {
      if (!formData.proposerName) {
        setError('Nom est obligatoire pour la personne qui propose.');
        return;
      }
    }

    const dataToSend = { ...formData };

    try {
      const response = await fetch('/api/objects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        router.push('/objects');
      } else {
        const data = await response.json();
        setError(data.error || 'Erreur lors de la création.');
      }
    } catch (err) {
      setError('Erreur réseau.');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-6">Ajouter un nouvel objet</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Propriétaire</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="ownerType"
                value="kerLogettes"
                checked={formData.ownerType === 'kerLogettes'}
                onChange={handleChange}
                className="mr-2"
              />
              Ker Logettes
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="ownerType"
                value="proposer"
                checked={formData.ownerType === 'proposer'}
                onChange={handleChange}
                className="mr-2"
              />
              Personne qui propose l'objet
            </label>
          </div>
        </div>
        {formData.ownerType === 'proposer' && (
          <div>
            <label className="block text-sm font-medium mb-1">Nom et prénom de la personne qui propose *</label>
            <input
              type="text"
              name="proposerName"
              value={formData.proposerName}
              onChange={handleChange}
              placeholder="Nom et prénom"
              className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              required
            />
          </div>
        )}
        {formData.ownerType === 'proposer' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone fixe</label>
              <input
                type="tel"
                name="contactPhoneFixed"
                value={formData.contactPhoneFixed}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Téléphone portable</label>
              <input
                type="tel"
                name="contactPhoneMobile"
                value={formData.contactPhoneMobile}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Préférence de contact</label>
              <select
                name="contactPreference"
                value={formData.contactPreference}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              >
                <option value="tel">Téléphone</option>
                <option value="mail">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-2">Statut particulier</label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="specialStatus"
                value="none"
                checked={!formData.isToGive && !formData.isRequestedMissing}
                onChange={() => setFormData(prev => ({ ...prev, isToGive: false, isRequestedMissing: false }))}
                className="mr-2"
              />
              Aucun
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="specialStatus"
                value="toGive"
                checked={formData.isToGive}
                onChange={() => setFormData(prev => ({ ...prev, isToGive: true, isRequestedMissing: false }))}
                className="mr-2"
              />
              À donner
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="specialStatus"
                value="requestedMissing"
                checked={formData.isRequestedMissing}
                onChange={() => setFormData(prev => ({ ...prev, isToGive: false, isRequestedMissing: true }))}
                className="mr-2"
              />
              Objet manquant et demandé
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Catégorie</label>
          <select
            name="category"
            value={showNewCategory ? 'new' : formData.category}
            onChange={(e) => handleSelectChange('category', e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
          >
            <option value="">Sélectionner</option>
            {options.categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            <option value="new">Ajouter nouveau</option>
          </select>
          {showNewCategory && (
            <input
              type="text"
              placeholder="Nouvelle catégorie"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border rounded mt-2 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sous-catégorie</label>
          <select
            name="subCategory"
            value={showNewSubCategory ? 'new' : formData.subCategory}
            onChange={(e) => handleSelectChange('subCategory', e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
          >
            <option value="">Sélectionner</option>
            {options.subCategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
            <option value="new">Ajouter nouveau</option>
          </select>
          {showNewSubCategory && (
            <input
              type="text"
              placeholder="Nouvelle sous-catégorie"
              value={formData.subCategory}
              onChange={(e) => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
              className="w-full px-3 py-2 border rounded mt-2 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
            />
          )}
        </div>
        {formData.ownerType === 'kerLogettes' && (
          <div>
            <label className="block text-sm font-medium mb-1">Lieu de rangement</label>
            <select
              name="shelf"
              value={showNewShelf ? 'new' : formData.shelf}
              onChange={(e) => handleSelectChange('shelf', e.target.value)}
              className="w-full px-3 py-2 border rounded bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
            >
              <option value="">Sélectionner</option>
              {options.shelves.map(shelf => <option key={shelf} value={shelf}>{shelf}</option>)}
              <option value="new">Ajouter nouveau</option>
            </select>
            {showNewShelf && (
              <input
                type="text"
                placeholder="Nouveau lieu de rangement"
                value={formData.shelf}
                onChange={(e) => setFormData(prev => ({ ...prev, shelf: e.target.value }))}
                className="w-full px-3 py-2 border rounded mt-2 bg-white dark:bg-zinc-800 text-black dark:text-zinc-50"
              />
            )}
          </div>
        )}
        <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Créer l'objet
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
