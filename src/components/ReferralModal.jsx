import React, { useState } from 'react';

export default function ReferralModal({ referrer, onClose, onSubmit }) {
  const [message, setMessage] = useState('');
  const [timeline, setTimeline] = useState('');

  const handle = e => {
    e.preventDefault();
    onSubmit(referrer.id, { message, timeline });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >✕</button>
        <h2 className="text-xl font-semibold mb-4">
          Ask {referrer.name} for a Referral
        </h2>
        <form onSubmit={handle}>
          <div className="mb-4">
            <label className="block mb-1">Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              required
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Expected Timeline</label>
            <input
              type="text"
              value={timeline}
              onChange={e => setTimeline(e.target.value)}
              required
              className="w-full border rounded px-2 py-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
}
