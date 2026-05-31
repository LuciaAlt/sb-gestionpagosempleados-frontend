export interface User {
  id: number;
  rolId: number;
  nombreUsuario: string;
  hashContrasena?: string;
  nombres: string;
  apellidos: string;
  correo: string;
  rolNombre?: string | null;
  activo: boolean;
  bloqueado: boolean;
  fechaCambioContrasena?: string | null;
  ultimoAcceso?: string | null;
  nombreCompleto?: string;
}

export interface UserRequest {
  id: number;
  rolId: number;
  nombreUsuario: string;
  hashContrasena: string;
  nombres: string;
  apellidos: string;
  correo: string;
  rolNombre?: string | null;
  activo: boolean;
  bloqueado: boolean;
}

export interface UserFilter {
  id?: number;
  nombres?: string;
  apellidos?: string;
  rolId?: number;
  nombreUsuario?: string;
  correo?: string;
  activo?: boolean;
  bloqueado?: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pages: number;
}

export interface Rol {
  id: number;
  nombre: string;
}