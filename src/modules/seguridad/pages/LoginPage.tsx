import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaLock, FaSignInAlt, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../components/AuthContext';
import logo from '../../../assets/logo-login.png';
import building from '../../../assets/building-sb.svg';
import RequiredLabel from '../../../shared/components/RequiredLabel';
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [recordar, setRecordar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    setValidated(true);

    if (!form.checkValidity()) return;

    setLoading(true);

    try {
      await login({ usuario, password, recordar });
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-shell">
     
<section className="login-brand-panel">
  <div className="login-brand-content">
    <img src={logo} className="login-logo" alt="Superintendencia de Bancos" />

    <div className="brand-line" />

    <h2>Bienvenida al sistema</h2>
    <p>Gestión de pagos de empleados</p>
  </div>

  <img
    src={building}
    className="login-building"
    alt="Edificio Superintendencia de Bancos"
  />
</section>
      <section className="login-form-panel">
        <div className="login-card">
          <h2>Iniciar Sesión</h2>
          <p className="text-muted mb-4">Por favor ingrese su usuario y contraseña</p>

          <form noValidate className={validated ? 'was-validated' : ''} onSubmit={submit}>
            <div className="mb-4">
              <label className="form-label">
                <RequiredLabel>Usuario</RequiredLabel>
              </label>

              <div className="input-icon">
                <FaUser />
                <input
                  required
                  className="form-control"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Ingrese su usuario"
                />
              </div>

              <div className="invalid-feedback">El usuario es requerido.</div>
            </div>

            <div className="mb-4">
              <label className="form-label">
                <RequiredLabel>Contraseña</RequiredLabel>
              </label>

              <div className="input-icon">
                <FaLock />
                <input
                  required
                  type={showPass ? 'text' : 'password'}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese su contraseña"
                />

                <button
                  type="button"
                  className="input-eye"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Mostrar u ocultar contraseña"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="invalid-feedback">La contraseña es requerida.</div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <FormCheck checked={recordar} onChange={setRecordar} label="Recordarme" />

              <Link to="/forgot-password" className="small forgot-link">
                ¿Olvidó su contraseña?
              </Link>
            </div>

            <button className="btn btn-primary w-100 login-btn" disabled={loading}>
              <FaSignInAlt className="me-2" />
              {loading ? 'Validando...' : 'Iniciar Sesión'}
            </button>
          </form>

          <div className="secure-box">
            <FaLock />
            <div>
              <strong>Acceso seguro</strong>
              <p>El sistema protege su información con los más altos estándares de seguridad.</p>
            </div>
          </div>
        </div>

        <small className="login-footer">
          © 2026 Superintendencia de Bancos de la República Dominicana
        </small>
      </section>
    </main>
  );
}

function FormCheck({
  checked,
  onChange,
  label
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="d-flex gap-2 align-items-center small">
      <input
        type="checkbox"
        className="form-check-input mt-0"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
}
