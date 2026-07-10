import { NavLink } from 'react-router-dom';
import { LayoutDashboard, RefreshCw, CalendarDays, LogOut, Waypoints } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/goals', label: 'Goals', icon: RefreshCw },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
];

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="flex h-screen w-56 shrink-0 flex-col bg-sidebar text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-7">
        <span className="text-xl font-extrabold tracking-tight">KotTra</span>
        <Waypoints size={20} className="text-meeting-bold" strokeWidth={2.5} />
      </div>

      {/* Nav */}
      <nav className="mt-2 flex flex-1 flex-col">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3.5 text-[15px] font-bold transition-colors ${
                isActive
                  ? 'bg-white text-sidebar'
                  : 'text-sidebar-muted hover:bg-sidebar-hover hover:text-white'
              }`
            }
          >
            <Icon size={18} strokeWidth={2.25} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={logout}
        className="flex items-center gap-3 px-6 py-6 text-[15px] font-bold text-sidebar-muted transition-colors hover:text-white cursor-pointer"
      >
        <LogOut size={18} strokeWidth={2.25} />
        Logout
      </button>
    </aside>
  );
}
