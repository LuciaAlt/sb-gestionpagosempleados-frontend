export interface LoginRequest { usuario: string; password: string; recordar?: boolean }

export interface AuthUser {
  id?: number;
  nombreCompleto?: string;
  nombreUsuario?: string;
  usuario?: string;
  correo?: string;
  role?: string;
   nombreRole?: string;
  activo?: boolean;
  bloqueado?: boolean;
  fechaCreacion?: string;
  ultimoAcceso?: string;
  avatarUrl?: string;
  permisos: string[];
  inicioEn?: string;
}

export interface LoginResponse {
  token: string;
  usuarioId:number;
  nombreUsuario:string
  usuario?: AuthUser;
  user?: AuthUser;
  permisos?: string[];
  nombreCompleto?: string;
  nombreuUsuario?: string;
  correo?: string;
  role?: string;
  nombreRole?: string;
  activo?: boolean;
  bloqueado?: boolean;
  ultimoAcceso?: string;
  fechaCreacion?: string;
  inicioEn?: string;
}

export interface ForgotPasswordRequest 
{ usuarioOCorreo: string 

}
export interface ResetPasswordRequest
 { token: string;
   nuevaPassword: string; 
   confirmarPassword: string
 }
