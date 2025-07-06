// src/services/api.js
import axios from 'axios';

const useMock = import.meta.env.VITE_API_BASE === 'mock';

export const apiClient = {
  get: async (path) => {
    if (useMock) {
      // loads src/data/<path>.json
      return import(`../data${path}.json`).then(m => m.default);
    }
    const base = import.meta.env.VITE_API_BASE;  
    const res  = await axios.get(`${base}${path}`);
    return res.data;
  },
  post: async (path, body) => {
    if (useMock) {
      return import(`../data${path}.json`).then(m => m.default);
    }
    const base = import.meta.env.VITE_API_BASE;  
    const res  = await axios.post(`${base}${path}`, body);
    return res.data;
  }
};
