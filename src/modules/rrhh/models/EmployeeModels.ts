export interface CatalogItem { id: number; nombre: string; codigo?: string }
export interface Employee {
  id: number;
  nombres: string;
  apellidos: string;
  nombreCompleto?: string;
  numeroSeguroSocial: string;
  departamentoId?: number;
  departamentoNombre?: string;
  departamento?: { id: number; nombre: string; codigo?: string };
  tipoEmpleadoId: number;
  tipoEmpleadoNombre?: string;
  tipoEmpleado?: { id: number; nombre: string; codigo?: string };
  salarioSemanal?: number;
  sueldoPorHora?: number;
  horasTrabajadas?: number;
  ventasBrutas?: number;
  tarifaComision?: number;
  salarioBase?: number;
  pagoSemanal?: number;
  activo: boolean;
}
export interface EmployeeRequest extends Omit<Employee, 'id' | 'pagoSemanal'> { id?: number }
export interface EmployeeFilter { id?: string; nombres?: string; tipoEmpleadoId?: string; departamentoId?: string; activo?: string }
export interface PaginatedResponse<T> { items: T[]; total: number; page: number; pages: number }
