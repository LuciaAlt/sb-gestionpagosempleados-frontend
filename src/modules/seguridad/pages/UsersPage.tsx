import { useEffect, useState } from 'react';
import { Button, Card, Collapse, Form, Table, Badge } from 'react-bootstrap';
import Swal from 'sweetalert2';

import {
  FaEye,
  FaEdit,
  FaToggleOn,
  FaToggleOff,
  FaPlus,
  FaSearch,
  FaBroom,
  FaFilter,
  FaLock,
  FaUnlock
} from 'react-icons/fa';

import { userService } from '../services/userService';
import { User, UserFilter, UserRequest, Rol } from '../models/UserModels';
import UserModal from '../components/UserModal';
import PaginationLite from '../../../shared/components/PaginationLite';
import ActionLink from '../../../shared/components/ActionLink';
import { useAuth } from '../components/AuthContext';
import { PERMISOS } from '../../../shared/utils/permissions';

export default function UsersPage() {
  const [roles, setRoles] = useState<Rol[]>([]);
  const { can } = useAuth();
  const [items, setItems] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [take, setTake] = useState(10);
  const [filters, setFilters] = useState<UserFilter>({});
  const [panel, setPanel] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);
  const [modal, setModal] = useState<'new' | 'edit' | 'detail' | null>(null);

  const load = async () => {
    try {
      const data = await userService.paginate(page, take, filters);

      setItems(data.items || []);
      setTotal(data.total || 0);
      setPages(data.pages || 0);
    } catch (error: any) {
      Swal.fire(
        'Error',
        error.friendlyMessage || 'No fue posible cargar usuarios.',
        'error'
      );
    }
  };

  useEffect(() => {
    load();
  }, [page, take]);

  const save = async (payload: UserRequest) => {
    try {
      if (selected) {
        await userService.update(selected.id, payload);
      } else {
        await userService.create(payload);
      }

      await Swal.fire(
        'Correcto',
        'Registro guardado correctamente.',
        'success'
      );

      await load();
    } catch (error: any) {
      Swal.fire(
        'Error',
        error.friendlyMessage || 'Error al guardar.',
        'error'
      );
    }
  };

  const status = async (user: User) => {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: `Se ${user.activo ? 'inactivará' : 'activará'} el usuario.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      await userService.changeStatus(user.id, !user.activo);
      await load();

      Swal.fire(
        'Correcto',
        `Usuario ${user.activo ? 'inactivado' : 'activado'} correctamente.`,
        'success'
      );
    } catch (error: any) {
      Swal.fire(
        'Error',
        error.friendlyMessage || 'Error al cambiar estado.',
        'error'
      );
    }
  };

  const blockUser = async (user: User) => {
    const result = await Swal.fire({
      title: '¿Está seguro?',
      text: `Se ${user.bloqueado ? 'desbloqueará' : 'bloqueará'} el usuario.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, continuar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      await userService.changeBlockStatus(user.id, !user.bloqueado);
      await load();

      Swal.fire(
        'Correcto',
        `Usuario ${user.bloqueado ? 'desbloqueado' : 'bloqueado'} correctamente.`,
        'success'
      );
    } catch (error: any) {
      Swal.fire(
        'Error',
        error.friendlyMessage || 'Error al cambiar el bloqueo.',
        'error'
      );
    }
  };

  const search = async () => {
    setPage(1);

    if (page === 1) {
      await load();
    }
  };

  const clear = async () => {
    setFilters({});
    setPage(1);

    setTimeout(() => {
      load();
    }, 0);
  };

  return (
    <Card className="content-card">
      <Card.Body>
        <div className="d-flex justify-content-between mb-3">
          <h4>Gestión Usuarios</h4>

          {can(PERMISOS.USUARIOS_CREAR) && (
            <Button
              onClick={() => {
                setSelected(null);
                setModal('new');
              }}
            >
              <FaPlus className="me-2" />
              Nuevo usuario
            </Button>
          )}
        </div>

        <div className="text-end mb-3">
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
                  value={filters.id ?? ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      id: e.target.value
                        ? Number(e.target.value)
                        : 0
                    })
                  }
                />
              </div>

              <div className="col-md-2">
                <Form.Control
                  placeholder="Nombres"
                  value={filters.nombres || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      nombres: e.target.value || undefined
                    })
                  }
                />
              </div>

              <div className="col-md-2">
                <Form.Control
                  placeholder="Apellidos"
                  value={filters.apellidos || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      apellidos: e.target.value || undefined
                    })
                  }
                />
              </div>

              <div className="col-md-2">
                <Form.Control
                  placeholder="Usuario"
                  value={filters.nombreUsuario || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      nombreUsuario: e.target.value || undefined
                    })
                  }
                />
              </div>
               <div className="col-md-2">
                  <Form.Select
                  value={filters.rolId || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                       rolId: e.target.value
                        ? Number(e.target.value)
                        : 0
                    })
                  }
                >
                  <option value="">Rol</option>
                  {roles.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nombre}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-2">
                <Form.Control
                  placeholder="Correo"
                  value={filters.correo || ''}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      correo: e.target.value || undefined
                    })
                  }
                />
              </div>

              <div className="col-md-2">
                <Form.Select
                  value={
                    filters.activo === undefined
                      ? ''
                      : filters.activo.toString()
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      activo:
                        e.target.value === ''
                          ? undefined
                          : e.target.value === 'true'
                    })
                  }
                >
                  <option value="">Estado</option>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </Form.Select>
              </div>

              <div className="col-md-2">
                <Form.Select
                  value={
                    filters.bloqueado === undefined
                      ? ''
                      : filters.bloqueado.toString()
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      bloqueado:
                        e.target.value === ''
                          ? undefined
                          : e.target.value === 'true'
                    })
                  }
                >
                  <option value="">Bloqueo</option>
                  <option value="true">Bloqueado</option>
                  <option value="false">Desbloqueado</option>
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
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Bloqueado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center text-muted">
                  No hay usuarios para mostrar.
                </td>
              </tr>
            )}

            {items.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombres}</td>
                <td>{user.apellidos}</td>
                <td>{user.nombreUsuario}</td>
                <td>{user.correo}</td>
                <td>{user.rolNombre}</td>
                <td>
                  <Badge bg={user.activo ? 'success' : 'secondary'}>
                    {user.activo ? 'Activo' : 'Inactivo'}
                  </Badge>
                </td>
                <td>
                  <Badge bg={user.bloqueado ? 'danger' : 'success'}>
                    {user.bloqueado ? 'Sí' : 'No'}
                  </Badge>
                </td>
                <td className="actions-cell">
                  <ActionLink
                    icon={FaEye}
                    label="Ver"
                    color="warning"
                    onClick={() => {
                      setSelected(user);
                      setModal('detail');
                    }}
                  />

                  {can(PERMISOS.USUARIOS_EDITAR) && (
                    <ActionLink
                      icon={FaEdit}
                      label="Editar"
                      color="primary"
                      onClick={() => {
                        setSelected(user);
                        setModal('edit');
                      }}
                    />
                  )}

                  {can(PERMISOS.USUARIOS_ACTIVARORDESACTIVAR) && (
                    <ActionLink
                      icon={user.activo ? FaToggleOff : FaToggleOn}
                      label={user.activo ? 'Inactivar' : 'Activar'}
                      color={user.activo ? 'secondary' : 'success'}
                      onClick={() => status(user)}
                    />
                  )}

                  {can(PERMISOS.USUARIOS_BLOQUEAORDESBLOQUEA) && (
                    <ActionLink
                      icon={user.bloqueado ? FaUnlock : FaLock}
                      label={user.bloqueado ? 'Desbloquear' : 'Bloquear'}
                      color={user.bloqueado ? 'success' : 'danger'}
                      onClick={() => blockUser(user)}
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
          onTake={(value) => {
            setTake(value);
            setPage(1);
          }}
        />

        <UserModal
          show={!!modal}
          onHide={() => {
            setModal(null);
            setSelected(null);
          }}
          user={selected}
          readonly={modal === 'detail'}
          onSave={save}
        />
      </Card.Body>
    </Card>
  );
}