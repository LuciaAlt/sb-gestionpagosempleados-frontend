import api from '../../../shared/services/http';
import { auditoriaEndpoints } from '../endpoints/auditoriaEndpoints';
import { AuditFilter, AuditItem, PaginatedResponse } from '../models/AuditoriaModels';
export const auditoriaService = {
  async paginate(page: number, take: number, filters: AuditFilter) {
    const { data } = await api.get<PaginatedResponse<AuditItem>>(auditoriaEndpoints.paginate, { params: { Page: page, Take: take, ...filters } });
    return data;
  }
};
