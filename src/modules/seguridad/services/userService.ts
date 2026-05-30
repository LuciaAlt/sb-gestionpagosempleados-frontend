import { CatalogItem } from './../../rrhh/models/EmployeeModels';
import api from '../../../shared/services/http';
import { userEndpoints } from '../endpoints/userEndpoints';
import { PaginatedResponse, User, UserFilter, UserRequest } from '../models/UserModels';
export const userService = {
  async paginate(page: number, take: number, filters: UserFilter) { const { data } = await api.get<PaginatedResponse<User>>(userEndpoints.paginate, { params: { Page: page, Take: take, ...filters } }); return data; },
    async getById(id: number) { const { data } = await api.get<User>(userEndpoints.getById(id)); return data; },
  async create(payload: UserRequest) { const { data } = await api.post(userEndpoints.create, payload); return data; },
  async update(id: number, payload: UserRequest) { const { data } = await api.put(userEndpoints.update(id), payload); return data; },
  async changeStatus(id: number, value: boolean) { const { data } = await api.patch(userEndpoints.changeStatus(id), null, { params: { value } }); return data; },
  async roles() { const { data } = await api.get<CatalogItem[]>(userEndpoints.roles); return data; }

};
