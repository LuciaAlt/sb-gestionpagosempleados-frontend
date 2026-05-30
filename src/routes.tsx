import { createBrowserRouter } from 'react-router-dom';
import AppLayout from './shared/layouts/AppLayout';
import ProtectedRoute from './modules/seguridad/components/ProtectedRoute';
import LoginPage from './modules/seguridad/pages/LoginPage';
import ForgotPasswordPage from './modules/seguridad/pages/ForgotPasswordPage';
import HomePage from './modules/seguridad/pages/HomePage';
import EmployeesPage from './modules/rrhh/pages/EmployeesPage';
import UsersPage from './modules/seguridad/pages/UsersPage';
import ReportsPage from './modules/reportes/pages/ReportsPage';
import AuditoriaPage from './modules/auditoria/pages/AuditoriaPage';
import { PERMISOS } from './shared/utils/permissions';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { element: <ProtectedRoute />, children: [
    { element: <AppLayout />, children: [
      { index: true, element: <HomePage /> },
      { element: <ProtectedRoute permission={PERMISOS.EMPLEADOS_VER} />, children: [{ path: 'empleados', element: <EmployeesPage /> }] },
      { element: <ProtectedRoute permission={PERMISOS.USUARIOS_VER} />, children: [{ path: 'usuarios', element: <UsersPage /> }] },
      { element: <ProtectedRoute permission={PERMISOS.REPORTES_VER} />, children: [{ path: 'reportes', element: <ReportsPage /> }] },
      { element: <ProtectedRoute permission={PERMISOS.AUDITORIA_VER} />, children: [{ path: 'auditoria', element: <AuditoriaPage /> }] }
    ]}
  ]}
]);
