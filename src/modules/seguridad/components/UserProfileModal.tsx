import { Modal, Button, Card, Row, Col, Badge } from 'react-bootstrap';
import { FaEnvelope, FaIdBadge, FaLock, FaShieldAlt, FaUser, FaUserCheck, FaUserClock } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import { dateTime } from '../../../shared/utils/format';

type Props = { show: boolean; onHide: () => void };
export default function UserProfileModal({ show, onHide }: Props) {
  const { user } = useAuth();
  if (!user) return null;
  const fullName = user.nombreCompleto || user.nombreUsuario || user.usuario || 'Usuario';
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton><Modal.Title>Perfil del Usuario</Modal.Title></Modal.Header>
      <Modal.Body>
        <div className="text-center mb-4">
          <div className="avatar-circle mx-auto"><FaUser /></div>
          <h4 className="mt-2 mb-0">{fullName}</h4>
          <Badge bg="primary">{user.nombreRole || 'Sin rol'}</Badge>
        </div>
        <Row className="g-3">
          <Col md={6}><InfoCard title="Información Personal" items={[
            ['Nombre completo', fullName, <FaUser />], ['Usuario', user.nombreUsuario || '', <FaIdBadge />], ['Correo', user.correo || '', <FaEnvelope />]
          ]} /></Col>
          <Col md={6}><InfoCard title="Información de Seguridad" items={[
            ['Rol', user.nombreRole || '', <FaShieldAlt />], ['Estado', user.activo === false ? 'Inactivo' : 'Activo', <FaUserCheck />], ['Bloqueo', user.bloqueado ? 'Bloqueado' : 'No bloqueado', <FaLock />], ['Fecha creación', dateTime(user.fechaCreacion), <FaUserClock />], ['Último acceso', dateTime(user.ultimoAcceso), <FaUserClock />]
          ]} /></Col>
          <Col md={12}><InfoCard title="Información de Sesión" items={[
            ['Inicio de sesión actual', dateTime(user.inicioEn), <FaUserClock />], ['Permisos', `${user.permisos?.length || 0} permisos asignados`, <FaShieldAlt />]
          ]} /></Col>
        </Row>
      </Modal.Body>
      <Modal.Footer><Button variant="secondary" onClick={onHide}>Cerrar</Button></Modal.Footer>
    </Modal>
  );
}
function InfoCard({ title, items }: { title: string; items: [string, string, React.ReactNode][] }) {
  return <Card className="h-100 shadow-sm border-0"><Card.Body><h6 className="fw-bold mb-3">{title}</h6>{items.map(([k, v, icon]) => <div className="d-flex align-items-center gap-2 mb-2" key={k}><span className="profile-icon">{icon}</span><div><small className="text-muted d-block">{k}</small><span>{v || 'N/D'}</span></div></div>)}</Card.Body></Card>;
}
