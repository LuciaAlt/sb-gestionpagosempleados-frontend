export interface AuditItem {
  id: number;
  usuarioRegistra: string;
  accion: string;
  entidad: string;
  entidadId?: number | string;
  detalle?: string;
  ip?: string;
  fecha: string;
}
export interface AuditFilter { usuarioRegistra?: string; accion?: string; entidad?: string; entidadId?: string; fechaDesde?: string; fechaHasta?: string }
export interface PaginatedResponse<T> { items: T[]; total: number; page: number; pages: number }
