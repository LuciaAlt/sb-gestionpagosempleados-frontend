export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  nombreUsuario: string;
  nombreCompleto:string;
  correo: string;
  rolNombre: string;
  rolId: number;
  activo: boolean;
  bloqueado: boolean;
  fechaCreacion?: string;
  ultimoAcceso?: string;
}

export interface UserRequest {
  id: number;
  nombres: string;
  apellidos: string;
  nombreCompleto:string;
  nombreUsuario: string;
  correo: string;
  rolId: number;
  password?: string;
  activo: boolean;
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