import React from 'react';

export default function FilterSidebar({ filters, onChange, onClear }) {
  return (
    <aside className="w-64 pr-4">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Filters</h2>
        {/* Example filter: Success Rate */}
        <div className="mb-4">
          <label className="block mb-1">Min Success Rate</label>
          <select
            value={filters.minSuccessRate}
            onChange={e => onChange({ minSuccessRate: Number(e.target.value) })}
            className="w-full border rounded px-2 py-1"
          >
            {[0,50,60,70,80,90].map(v => (
              <option key={v} value={v}>{v}%+</option>
            ))}
          </select>
        </div>
        {/* Example filter: Experience */}
        <div className="mb-4">
          <label className="block mb-1">Experience</label>
          <select
            value={filters.minExperience}
            onChange={e => onChange({ minExperience: Number(e.target.value) })}
            className="w-full border rounded px-2 py-1"
          >
            {[0,1,2,3,5,7].map(v => (
              <option key={v} value={v}>{v}+ years</option>
            ))}
          </select>
        </div>
        <button
          onClick={onClear}
          className="mt-2 text-sm text-blue-600 hover:underline"
        >
          Clear Filters
        </button>
      </div>
    </aside>
  );
}
