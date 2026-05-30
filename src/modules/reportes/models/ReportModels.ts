export interface ReportItem {
  employeeId: number;
  nombreCompleto: string;
  numeroSeguroSocial: string;
  departamento: string;
  tipoEmpleadoNombre: string;
  detalleCalculo: string;
  pagoSemanal: number;
}
export interface ReportDto {
  fechaGeneracion: string;
  totalEmpleados: number;
  totalPagado: number;
  items: ReportItem[];
}
