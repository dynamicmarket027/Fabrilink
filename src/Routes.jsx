import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import JobOpportunities from './pages/job-opportunities';
import Login from './pages/login';
import ProfileManagement from './pages/profile-management';
import Dashboard from './pages/dashboard';
import ProfessionalNetwork from './pages/professional-network';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Login />} />
        <Route path="/job-opportunities" element={<JobOpportunities />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-management" element={<ProfileManagement />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/professional-network" element={<ProfessionalNetwork />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
