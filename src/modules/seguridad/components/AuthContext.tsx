import React, { createContext, useContext, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { authService } from '../services/authService';
import { AuthUser, LoginRequest } from '../models/AuthModels';
import { hasPermission } from '../../../shared/utils/permissions';

type AuthContextType = {
  user: AuthUser | null;
  token: string | null;
  login: (request: LoginRequest) => Promise<void>;
  logout: () => void;
  can: (permission: string) => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('sb_token'));
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem('sb_user');
    return raw ? JSON.parse(raw) : null;
  });

  const login = async (request: LoginRequest) => {
    try {
      const result = await authService.login(request);
      if (result.user.activo === false) {
        await Swal.fire('Usuario inactivo', 'El usuario no se encuentra activo.', 'warning');
        return;
      }
      if (result.user.bloqueado === true) {
        await Swal.fire('Usuario bloqueado', 'El usuario está bloqueado. Contacte al administrador.', 'warning');
        return;
      }
      localStorage.setItem('sb_token', result.token);
      localStorage.setItem('sb_user', JSON.stringify(result.user));
      setToken(result.token);
      setUser(result.user);
    } catch (error: any) {
      const msg = error?.friendlyMessage || 'Usuario o contraseña incorrectos.';
      await Swal.fire('No fue posible iniciar sesión', msg, 'error');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('sb_token');
    localStorage.removeItem('sb_user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    login,
    logout,
    can: (permission: string) => hasPermission(user?.permisos, permission)
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
