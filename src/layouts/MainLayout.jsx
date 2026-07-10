import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-app-bg">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto scrollbar-thin px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
