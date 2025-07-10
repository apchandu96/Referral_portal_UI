// src/components/ReferralModal.jsx
import React, { useState } from 'react';

export default function ReferralModal({ referrer, onClose, onSubmit }) {
  const [message, setMessage]   = useState('');
  const [timeline, setTimeline] = useState('');

  // Build a URL you can share
  const shareUrl = `${window.location.origin}/referrer/${referrer.id}`;

  const handleSend = e => {
    e.preventDefault();
    onSubmit(referrer.id, { message, timeline });
  };

  const handleShare = () => {
    const shareData = {
      title: `Referral request for ${referrer.name}`,
      text: `Check out ${referrer.name} at ${referrer.company}`,
      url: shareUrl
    };

    if (navigator.share) {
      navigator.share(shareData).catch(err => {
        console.error('Share failed:', err);
        alert('Could not share, please copy link manually.');
      });
    } else {
      navigator.clipboard.writeText(shareUrl)
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => alert('Copy failed, please copy manually.'));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mt-8 p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
        >×</button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4">
          Ask {referrer.name} for a Referral
        </h2>

        {/* Profile details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p><span className="font-semibold">Company:</span> {referrer.company}</p>
            <p><span className="font-semibold">Title:</span> {referrer.title}</p>
            {referrer.department && (
              <p><span className="font-semibold">Department:</span> {referrer.department}</p>
            )}
            {referrer.experience != null && (
              <p><span className="font-semibold">Experience:</span> {referrer.experience} year{referrer.experience !== 1 ? 's' : ''}</p>
            )}
            {referrer.successRate != null && (
              <p><span className="font-semibold">Success Rate:</span> {referrer.successRate}%</p>
            )}
            {referrer.domains?.length > 0 && (
              <p>
                <span className="font-semibold">Domains:</span>{' '}
                {referrer.domains.join(', ')}
              </p>
            )}
          </div>
          <div className="space-y-2">
            {referrer.linkedin && (
              <p>
                <span className="font-semibold">LinkedIn:</span>{' '}
                <a
                  href={referrer.linkedin}
                  target="_blank"
                  rel="noopener"
                  className="text-blue-600 hover:underline"
                >
                  View Profile
                </a>
              </p>
            )}
            {referrer.portfolio && (
              <p>
                <span className="font-semibold">Portfolio:</span>{' '}
                <a
                  href={referrer.portfolio}
                  target="_blank"
                  rel="noopener"
                  className="text-blue-600 hover:underline"
                >
                  View Portfolio
                </a>
              </p>
            )}
            {referrer.jobPortal && (
              <p>
                <span className="font-semibold">Job Portal:</span>{' '}
                <a
                  href={referrer.jobPortal}
                  target="_blank"
                  rel="noopener"
                  className="text-blue-600 hover:underline"
                >
                  Company Jobs
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Professional summary */}
        {referrer.summary && (
          <div className="mb-6">
            <h3 className="font-semibold mb-1">About {referrer.name}</h3>
            <p className="text-gray-700">{referrer.summary}</p>
          </div>
        )}

        <hr className="my-6" />

        {/* Message form */}
        <form onSubmit={handleSend} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Your Message</label>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Expected Timeline</label>
            <input
              type="text"
              value={timeline}
              onChange={e => setTimeline(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Send Request
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="flex-1 bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
            >
              Share Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
