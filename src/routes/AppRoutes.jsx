import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Calendar = lazy(() => import('@/pages/Calendar'));
const Goals = lazy(() => import('@/pages/Goals'));
const NotFound = lazy(() => import('@/pages/NotFound'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
