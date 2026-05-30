import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ permission }: { permission?: string }) {
  const { token, can } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  if (permission && !can(permission)) return <Navigate to="/" replace />;
  return <Outlet />;
}
