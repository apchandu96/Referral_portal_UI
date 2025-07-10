import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import CreatableSelect from 'react-select/creatable';

const domainOptions = [
  { value: 'software', label: 'Software' },
  { value: 'finance',  label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education',  label: 'Education' },
  { value: 'marketing',  label: 'Marketing' },
  { value: 'sales',      label: 'Sales' },
  { value: 'hr',         label: 'Human Resources' },
  { value: 'operations', label: 'Operations' },
  { value: 'legal',      label: 'Legal' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'other',      label: 'Other' }
];

export default function ProviderRegistrationPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    company: '',
    department: '',
    experience: '',
    linkedin: '',
    portfolio: '',
    jobPortal: '',
    summary: ''
  });

  const [domains, setDomains] = useState([]); // array of {value,label}
  const [otherDomain, setOtherDomain] = useState('');

  const mutation = useMutation({
  mutationKey: ['register-provider'],
  mutationFn: data => apiClient.post('/register-provider', data),
  onSuccess: () => alert('Provider registered!')
});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // build domain list: replace 'other' with otherDomain
    const finalDomains = domains.map(d => 
      d.value === 'other' && otherDomain ? otherDomain : d.value
    );
    mutation.mutate({ ...form, domains: finalDomains });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-6">Register as a Referral Provider</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Info */}
        <div>
          <label className="block mb-1">Name</label>
          <input name="name" value={form.name} onChange={handleChange}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange}
            className="w-full border rounded px-3 py-2" required />
        </div>

        {/* Employment Details */}
        <div>
          <label className="block mb-1">Company</label>
          <input name="company" value={form.company} onChange={handleChange}
            className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block mb-1">Department/Team</label>
          <input name="department" value={form.department} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Years of Experience</label>
          <input type="number" name="experience" value={form.experience} onChange={handleChange}
            min="0" className="w-full border rounded px-3 py-2" />
        </div>

        {/* Verification Links */}
        <div>
          <label className="block mb-1">LinkedIn Profile URL</label>
          <input name="linkedin" value={form.linkedin} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Portfolio/GitHub URL</label>
          <input name="portfolio" value={form.portfolio} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block mb-1">Company Job Portal URL</label>
          <input name="jobPortal" value={form.jobPortal} onChange={handleChange}
            className="w-full border rounded px-3 py-2" />
        </div>

        {/* Professional Summary */}
        <div>
          <label className="block mb-1">Professional Summary</label>
          <textarea name="summary" value={form.summary} onChange={handleChange}
            rows={3} className="w-full border rounded px-3 py-2" />
        </div>

        {/* Referral Scope Domains */}
        <div>
          <label className="block mb-1">Domains You Can Refer For</label>
          <CreatableSelect
            isMulti
            options={domainOptions}
            value={domains}
            onChange={setDomains}
            placeholder="Select or type to search domains…"
            className="mb-2"
          />
          {domains.find(d => d.value === 'other') && (
            <div>
              <label className="block mb-1">Please specify other domain</label>
              <input
                value={otherDomain}
                onChange={e => setOtherDomain(e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Type your domain"
                required
              />
            </div>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center">
          <input id="tos" type="checkbox" className="mr-2" required />
          <label htmlFor="tos">
            I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register as Provider
        </button>
      </form>
    </div>
  );
}
