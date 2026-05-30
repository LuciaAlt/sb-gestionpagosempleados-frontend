export const employeeEndpoints = {
  paginate: '/api/Empleado/GetPaginate',
  getById: (id: number) => `/api/Empleado/${id}`,
  create: '/api/Empleado',
  update: (id: number) => `/api/Empleado/${id}`,
  changeStatus: (id: number) => `/api/Empleado/${id}`,
  delete: (id: number) => `/api/Empleado/${id}`,
  departments: '/api/Catalogos/departments',
  employeeTypes: '/api/Catalogos/employee-types'
};
