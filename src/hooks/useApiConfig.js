import { useEffect } from 'react';

export default function useApiConfig() {
  useEffect(() => {
    console.log('API base:', import.meta.env.VITE_API_BASE);
  }, []);
}
