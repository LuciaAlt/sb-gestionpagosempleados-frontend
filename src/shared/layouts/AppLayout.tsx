import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaChartBar, FaClipboardList, FaHome, FaSignOutAlt, FaUsers, FaUserTie } from 'react-icons/fa';
import { useAuth } from '../../modules/seguridad/components/AuthContext';
import UserProfileModal from '../../modules/seguridad/components/UserProfileModal';
import { PERMISOS } from '../utils/permissions';
import logo from '../../assets/logo-sb.png';

export default function AppLayout() {
  const { user, logout, can } = useAuth();
  const [profile, setProfile] = useState(false);
  const name = user?.nombreCompleto || user?.nombreUsuario || user?.usuario || 'Usuario';
  return <div className="app-layout"><aside className="sidebar"><img src={logo} alt="SB" className="sidebar-logo" /><nav><NavItem to="/" icon={<FaHome />} label="Inicio" />{can(PERMISOS.EMPLEADOS_VER) && <NavItem to="/empleados" icon={<FaUserTie />} label="Gestión Empleados" />}{can(PERMISOS.USUARIOS_VER) && <NavItem to="/usuarios" icon={<FaUsers />} label="Gestión Usuarios" />}{can(PERMISOS.REPORTES_VER) && <NavItem to="/reportes" icon={<FaChartBar />} label="Reportes" />}{can(PERMISOS.AUDITORIA_VER) && <NavItem to="/auditoria" icon={<FaClipboardList />} label="Auditoría" />}</nav></aside><main className="main"><header className="topbar"><h3>Sistema de Gestión de Pagos de Empleados</h3><div className="user-menu"><button className="user-name" onClick={() => setProfile(true)}>{name}</button><button className="btn btn-outline-light btn-sm" onClick={logout}><FaSignOutAlt className="me-1" /> Salir</button></div></header><section className="page-body"><Outlet /></section></main><UserProfileModal show={profile} onHide={() => setProfile(false)} /></div>;
}
function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) { return <NavLink to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>{icon}<span>{label}</span></NavLink>; }
