import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient }   from '../services/api';
import { Link }        from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ReferralModal   from '../components/ReferralModal';

export default function HomePage() {
  const queryClient = useQueryClient();

  // Search term & filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters]       = useState({ minSuccessRate: 0, minExperience: 0 });

  // Modal state
  const [selected, setSelected]     = useState(null);

  // Fetch cards from /home?query=…
  const { data, isLoading, error } = useQuery({
    queryKey: ['home', searchTerm, filters],
    queryFn: () => {
      let path = '/home';
      const params = new URLSearchParams();
      if (searchTerm) params.set('query', searchTerm);
      if (filters.minSuccessRate) params.set('minSuccessRate', filters.minSuccessRate);
      if (filters.minExperience)  params.set('minExperience', filters.minExperience);
      if ([...params].length) path += `?${params.toString()}`;
      return apiClient.get(path);
    }
  });

  // Mutation to submit referral request
  const mutation = useMutation({
    mutationFn: ([id, payload]) => apiClient.post(`/request/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home'] });
      setSelected(null);
      alert('Referral request sent!');
    }
  });

  const cards = data?.referrals || [];

  return (
    <div className="flex">
      <FilterSidebar
        filters={filters}
        onChange={delta => setFilters(f => ({ ...f, ...delta }))}
        onClear={() => setFilters({ minSuccessRate: 0, minExperience: 0 })}
      />

      <main className="flex-1 p-8">
        {/* Search Bar */}
        <form
          onSubmit={e => { e.preventDefault(); setSearchTerm(searchTerm); }}
          className="flex mb-6"
        >
          <input
            type="text"
            placeholder="Search referrals…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-grow border rounded-l px-4 py-2"
          />
          <button type="submit" className="bg-blue-600 text-white px-6 rounded-r">
            Search
          </button>
        </form>

        {/* Status */}
        {isLoading && <p>Loading…</p>}
        {error     && <p className="text-red-500">Error loading referrals.</p>}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(r => (
            <div key={r.id} className="bg-white shadow rounded-lg overflow-hidden">
              <Link to={`/referrer/${r.id}`}>
                {r.imageUrl && <img src={r.imageUrl} alt={r.title} className="w-full h-40 object-cover" />}
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{r.title}</h3>
                  <p className="text-sm text-gray-600">{r.company}</p>
                </div>
              </Link>
              <div className="p-4 border-t">
                <button
                  onClick={() => setSelected(r)}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Ask for Referral
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selected && (
        <ReferralModal
          referrer={selected}
          onClose={() => setSelected(null)}
          onSubmit={(id, payload) => mutation.mutate([id, payload])}
        />
      )}
    </div>
  );
}
