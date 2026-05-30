import { FormEvent, useEffect, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import RequiredLabel from '../../../shared/components/RequiredLabel';
import { Rol, User, UserRequest } from '../models/UserModels';
import Swal from 'sweetalert2';
import api from '../../../shared/services/http';

const empty: UserRequest = {
  id:0,
  nombres: '',
  apellidos: '',
  nombreCompleto: '',
  nombreUsuario: '',
  correo: '',
  rolId: 0,
  password: '',
  activo: true
};

export default function UserModal({
  show,
  onHide,
  onSave,
  user,
  readonly
}: {
  show: boolean;
  onHide: () => void;
  onSave: (p: UserRequest) => Promise<void>;
  user?: User | null;
  readonly?: boolean;
}) {
  const [form, setForm] = useState<UserRequest>(empty);
  const [roles, setRoles] = useState<Rol[]>([]);
  const [validated, setValidated] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadRoles = async () => {
    try {
      const { data } = await api.get<Rol[]>('/Catalogos/roles');
      setRoles(data || []);
    } catch (error: any) {
      Swal.fire(
        'Error',
        error.friendlyMessage || 'No fue posible cargar los roles.',
        'error'
      );
    }
  };

  useEffect(() => {
    if (!show) return;

    loadRoles();

    user
    ? {
        id: user.id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        nombreUsuario: user.nombreUsuario,
        correo: user.correo,
        rolId: user.rolId || 0,
        password: '',
        activo: user.activo
      }
    : empty


    setValidated(false);
  }, [show, user]);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setValidated(true);

    if (!e.currentTarget.checkValidity()) return;

    setSaving(true);

    try {
      await onSave({
        ...form,
        rolId: Number(form.rolId)
      });

      onHide();
    } finally {
      setSaving(false);
    }
  };

  const set = (key: keyof UserRequest, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Form
        noValidate
        className={validated ? 'was-validated' : ''}
        onSubmit={submit}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {readonly ? 'Detalle usuario' : user ? 'Editar usuario' : 'Nuevo usuario'}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="g-3">
            {user && (
              <Col md={4}>
                <Form.Label>Código</Form.Label>
                <Form.Control value={user.id} disabled />
              </Col>
            )}

            <Col md={user ? 4 : 6}>
              <Form.Label>
                <RequiredLabel>Nombres</RequiredLabel>
              </Form.Label>
              <Form.Control
                required
                disabled={readonly}
                value={form.nombres}
                onChange={(e) => set('nombres', e.target.value)}
              />
              <div className="invalid-feedback">Los nombres son requeridos.</div>
            </Col>

            <Col md={user ? 4 : 6}>
              <Form.Label>
                <RequiredLabel>Apellidos</RequiredLabel>
              </Form.Label>
              <Form.Control
                required
                disabled={readonly}
                value={form.apellidos}
                onChange={(e) => set('apellidos', e.target.value)}
              />
              <div className="invalid-feedback">Los apellidos son requeridos.</div>
            </Col>

            <Col md={6}>
              <Form.Label>
                <RequiredLabel>Usuario</RequiredLabel>
              </Form.Label>
              <Form.Control
                required
                disabled={readonly || !!user}
                value={form.nombreUsuario}
                onChange={(e) => set('nombreUsuario', e.target.value)}
              />
              <div className="invalid-feedback">El usuario es requerido.</div>
            </Col>

            <Col md={6}>
              <Form.Label>
                <RequiredLabel>Correo</RequiredLabel>
              </Form.Label>
              <Form.Control
                required
                type="email"
                disabled={readonly}
                value={form.correo}
                onChange={(e) => set('correo', e.target.value)}
              />
              <div className="invalid-feedback">El correo es requerido.</div>
            </Col>

            <Col md={6}>
              <Form.Label>
                <RequiredLabel>Rol</RequiredLabel>
              </Form.Label>
              <Form.Select
                required
                disabled={readonly}
                value={form.rolId || ''}
                onChange={(e) => set('rolId', Number(e.target.value))}
              >
                <option value="">Seleccione un rol</option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.nombre}
                  </option>
                ))}
              </Form.Select>
              <div className="invalid-feedback">El rol es requerido.</div>
            </Col>

            {!user && (
              <Col md={6}>
                <Form.Label>
                  <RequiredLabel>Contraseña</RequiredLabel>
                </Form.Label>
                <Form.Control
                  required
                  type="password"
                  disabled={readonly}
                  value={form.password || ''}
                  onChange={(e) => set('password', e.target.value)}
                />
                <div className="invalid-feedback">La contraseña es requerida.</div>
              </Col>
            )}

            <Col md={6}>
              <Form.Check
                type="switch"
                label="Activo"
                disabled={readonly}
                checked={!!form.activo}
                onChange={(e) => set('activo', e.target.checked)}
              />
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>

          {!readonly && (
            <Button type="submit" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}