import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useApiConfig from './hooks/useApiConfig';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import DashboardPage from './pages/DashboardPage';
import SearchPage from './pages/SearchPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ReferrerDetailsPage from './pages/ReferrerDetailsPage';
import RequestFormPage from './pages/RequestFormPage';
import Navbar from './components/Navbar';
import ProviderRegistrationPage from './pages/ProviderRegistartionPage';

const queryClient = new QueryClient();

export default function App() {
  useApiConfig();
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/provider-registration" element={<ProviderRegistrationPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/referrer/:id" element={<ReferrerDetailsPage />} />
          <Route path="/request/:id" element={<RequestFormPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}
