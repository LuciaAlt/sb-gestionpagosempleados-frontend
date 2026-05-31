import { useEffect, useState } from 'react';
import { Button, Card, Collapse, Form, Table, Badge } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FaEye, FaEdit, FaToggleOn, FaToggleOff, FaPlus, FaSearch, FaBroom, FaFilter } from 'react-icons/fa';
import { employeeService } from '../services/employeeService';
import { CatalogItem, Employee, EmployeeFilter } from '../models/EmployeeModels';
import EmployeeModal from '../components/EmployeeModal';
import PaginationLite from '../../../shared/components/PaginationLite';
import ActionLink from '../../../shared/components/ActionLink';
import { money } from '../../../shared/utils/format';
import { useAuth } from '../../seguridad/components/AuthContext';
import { PERMISOS } from '../../../shared/utils/permissions';

export default function EmployeesPage() {
  const { can } = useAuth();
  const [items, setItems] = useState<Employee[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [take, setTake] = useState(10);
  const [filters, setFilters] = useState<EmployeeFilter>({});
  const [panel, setPanel] = useState(false);
  const [types, setTypes] = useState<CatalogItem[]>([]);
  const [departments, setDepartments] = useState<CatalogItem[]>([]);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [modal, setModal] = useState<"new" | "edit" | "detail" | null>(null);
  const load = async () => {
    try {
      const data = await employeeService.paginate(page, take, filters);
      setItems(data.items || []);
      setTotal(data.total || 0);
      setPages(data.pages || 0);
    } catch (e: any) {
      Swal.fire(
        "Error",
        e.friendlyMessage || "No fue posible cargar empleados.",
        "error"
      );
    }
  };
  useEffect(() => {
    load();
  }, [page, take]);
  useEffect(() => {
    employeeService.employeeTypes().then(setTypes);
    employeeService.departments().then(setDepartments);
  }, []);
  const search = () => {
    setPage(1);
    load();
  };
  const clear = () => {
    setFilters({});
    setPage(1);
    setTimeout(load, 0);
  };
  const save = async (payload: any) => {
    try {
      selected
        ? await employeeService.update(selected.id, payload)
        : await employeeService.create(payload);
      await Swal.fire(
        "Correcto",
        "Registro guardado correctamente.",
        "success"
      );
      await load();
    } catch (e: any) {
      Swal.fire("Error", e.friendlyMessage || "Error al guardar.", "error");
    }
  };
  const status = async (emp: Employee) => {
    const res = await Swal.fire({
      title: "¿Está seguro?",
      text: `Se ${emp.activo ? "inactivará" : "activará"} el empleado.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    });
    if (!res.isConfirmed) return;
    try {
      await employeeService.changeStatus(emp.id, !emp.activo);
      await load();
    } catch (e: any) {
      Swal.fire(
        "Error",
        e.friendlyMessage || "No fue posible cambiar el estado.",
        "error"
      );
    }
  };
  return (
    <Card className="content-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Gestión Empleados</h4>
          {can(PERMISOS.EMPLEADOS_CREAR) && (
            <Button
              onClick={() => {
                setSelected(null);
                setModal("new");
              }}
            >
              <FaPlus className="me-2" />
              Nuevo empleado
            </Button>
          )}
        </div>
        <div className="d-flex justify-content-end gap-2 mb-3">
          <Button variant="outline-primary" onClick={() => setPanel(!panel)}>
            <FaFilter className="me-2" />
            Filtros
          </Button>
        </div>
        <Collapse in={panel}>
          <div className="filter-panel mb-3">
            <div className="row g-2">
              <div className="col-md-2">
                <Form.Control
                  placeholder="Código"
                  value={filters.id || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, id: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <Form.Control
                  placeholder="Nombre"
                  value={filters.nombres || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, nombres: e.target.value })
                  }
                />
              </div>
              <div className="col-md-3">
                <Form.Select
                  value={filters.departamentoId || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, departamentoId: e.target.value })
                  }
                >
                  <option value="">Departamento</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.nombre}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-2">
                <Form.Select
                  value={filters.tipoEmpleadoId || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, tipoEmpleadoId: e.target.value })
                  }
                >
                  <option value="">Tipo</option>
                  {types.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nombre}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-2">
                <Form.Select
                  value={filters.activo || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, activo: e.target.value })
                  }
                >
                  <option value="">Estado</option>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </Form.Select>
              </div>
              <div className="col-12 text-end">
                <Button className="me-2" onClick={search}>
                  <FaSearch className="me-2" />
                  Buscar
                </Button>
                <Button variant="secondary" onClick={clear}>
                  <FaBroom className="me-2" />
                  Limpiar
                </Button>
              </div>
            </div>
          </div>
        </Collapse>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Seguro Social</th>
              <th>Departamento</th>
              <th>Tipo Empleado</th>
              <th>Pago Semanal</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.nombreCompleto || `${e.nombres} ${e.apellidos}`}</td>
                <td>{e.numeroSeguroSocial}</td>
                <td>{e.departamentoNombre || e.departamento?.nombre}</td>
                <td>{e.tipoEmpleadoNombre || e.tipoEmpleado?.nombre}</td>
                <td>{money(e.pagoSemanal)}</td>
                <td>
                  <Badge bg={e.activo ? "success" : "secondary"}>
                    {e.activo ? "Activo" : "Inactivo"}
                  </Badge>
                </td>
                <td className="actions-cell">
                  <ActionLink
                    icon={FaEye}
                    label="Ver"
                    color="warning"
                    onClick={() => {
                      setSelected(e);
                      setModal("detail");
                    }}
                  />
                  {can(PERMISOS.EMPLEADOS_EDITAR) && (
                    <ActionLink
                      icon={FaEdit}
                      label="Editar"
                      color="primary"
                      onClick={() => {
                        setSelected(e);
                        setModal("edit");
                      }}
                    />
                  )}
                  {can(PERMISOS.EMPLEADOS_ACTIVARORDESACTIVAR) && (
                    <ActionLink
                      icon={e.activo ? FaToggleOff : FaToggleOn}
                      label={e.activo ? "Inactivar?" : "Activar?"}
                      color={e.activo ? "secondary" : "success"}
                      onClick={() => status(e)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <PaginationLite
          page={page}
          pages={pages}
          take={take}
          total={total}
          onPage={setPage}
          onTake={(t) => {
            setTake(t);
            setPage(1);
          }}
        />
        <EmployeeModal
          show={!!modal}
          onHide={() => setModal(null)}
          employee={selected}
          readonly={modal === "detail"}
          departments={departments}
          types={types}
          onSave={save}
        />
      </Card.Body>
    </Card>
  );
}

