import { Card, Row, Col } from "react-bootstrap";
import { FaChartBar, FaUsers, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { PERMISOS } from "../../../shared/utils/permissions";
import logo from "../../../assets/logo-sb.png";

export default function HomePage() {
  const navigate = useNavigate();
  const { can } = useAuth();

  return (
    <Card className="content-card home-card">
      <Card.Body className="text-center">
        <img src={logo} className="home-logo" alt="SB" />

        <h2>Bienvenida al sistema</h2>

        <p className="text-muted">
          Sistema de Gestión de Pagos de Empleados
        </p>

        <Row className="g-3 mt-3">
          {can(PERMISOS.EMPLEADOS_VER) && (
            <Col md={4}>
              <Quick
                icon={<FaUserTie />}
                title="Empleados"
                onClick={() => navigate("/empleados")}
              />
            </Col>
          )}

          {can(PERMISOS.USUARIOS_VER) && (
            <Col md={4}>
              <Quick
                icon={<FaUsers />}
                title="Usuarios"
                onClick={() => navigate("/usuarios")}
              />
            </Col>
          )}

          {can(PERMISOS.REPORTES_VER) && (
            <Col md={4}>
              <Quick
                icon={<FaChartBar />}
                title="Reportes"
                onClick={() => navigate("/reportes")}
              />
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}

function Quick({
  icon,
  title,
  onClick
}: {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
}) {
  return (
    <div
      className="quick-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
    >
      {icon}
      <strong>{title}</strong>
    </div>
  );
}