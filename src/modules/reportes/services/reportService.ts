import api from '../../../shared/services/http';
import { reportEndpoints } from '../endpoints/reportEndpoints';
import { ReportDto } from '../models/ReportModels';
import { CatalogItem } from '../../rrhh/models/EmployeeModels';
export const reportService = {
  async weeklyByType(tipo: number) { const { data } = await api.get<ReportDto>(reportEndpoints.weeklyByType, { params: { tipo } }); return data; },
  async employeeTypes() { const { data } = await api.get<CatalogItem[]>(reportEndpoints.employeeTypes); return data; }
};
