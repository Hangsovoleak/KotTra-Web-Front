import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { UserProvider } from '@/context/UserContext';
import { NotificationProvider } from '@/context/NotificationContext';
import AppRoutes from '@/routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <NotificationProvider>
              <AppRoutes />
            </NotificationProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
