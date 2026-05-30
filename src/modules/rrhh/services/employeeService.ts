import api from '../../../shared/services/http';
import { employeeEndpoints } from '../endpoints/employeeEndpoints';
import { CatalogItem, Employee, EmployeeFilter, EmployeeRequest, PaginatedResponse } from '../models/EmployeeModels';

export const employeeService = {
  async paginate(page: number, take: number, filters: EmployeeFilter) {
    const params = { Page: page, Take: take, ...filters };
    const { data } = await api.get<PaginatedResponse<Employee>>(employeeEndpoints.paginate, { params });
    return data;
  },
  async getById(id: number) { const { data } = await api.get<Employee>(employeeEndpoints.getById(id)); return data; },
  async create(payload: EmployeeRequest) { const { data } = await api.post(employeeEndpoints.create, payload); return data; },
  async update(id: number, payload: EmployeeRequest) { const { data } = await api.put(employeeEndpoints.update(id), payload); return data; },
  async changeStatus(id: number, value: boolean) { const { data } = await api.patch(employeeEndpoints.changeStatus(id), null, { params: { value } }); return data; },
  async remove(id: number) { const { data } = await api.delete(employeeEndpoints.delete(id)); return data; },
  async departments() { const { data } = await api.get<CatalogItem[]>(employeeEndpoints.departments); return data; },
  async employeeTypes() { const { data } = await api.get<CatalogItem[]>(employeeEndpoints.employeeTypes); return data; }
};
