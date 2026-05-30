export const PERMISOS = {
  EMPLEADOS_VER: 'EMPLEADOS_VER',
  EMPLEADOS_CREAR: 'EMPLEADOS_CREAR',
  EMPLEADOS_EDITAR: 'EMPLEADOS_EDITAR',
  EMPLEADOS_INACTIVAR: 'EMPLEADOS_INACTIVAR',
  REPORTES_VER: 'REPORTES_VER',
  REPORTES_EXPORTAR: 'REPORTES_EXPORTAR',
  USUARIOS_VER: 'USUARIOS_VER',
  USUARIOS_CREAR: 'USUARIOS_CREAR',
  AUDITORIA_VER: 'AUDITORIA_VER'
} as const;

export type Permiso = keyof typeof PERMISOS | string;

export function hasPermission(permisos: string[] | undefined, permiso: string): boolean {
  return Array.isArray(permisos) && permisos.includes(permiso);
}
