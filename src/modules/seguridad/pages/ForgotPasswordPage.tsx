import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { authService } from '../services/authService';
import RequiredLabel from '../../../shared/components/RequiredLabel';
import logo from '../../../assets/logo-sb.png';

export default function ForgotPasswordPage() {
  const [usuarioOCorreo, setUsuarioOCorreo] = useState('');
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;
    setLoading(true);
    try {
      await authService.forgotPassword({ usuarioOCorreo });
      await Swal.fire('Solicitud enviada', 'Si el usuario existe, recibirá instrucciones para restablecer su contraseña.', 'success');
    } catch (error: any) {
      await Swal.fire('Error', error?.friendlyMessage || 'No fue posible procesar la solicitud.', 'error');
    } finally { setLoading(false); }
  };
  return <div className="simple-auth-page"><div className="simple-auth-card"><img src={logo} alt="SB" className="simple-logo" /><h3>Olvidé mi contraseña</h3><p className="text-muted">Ingrese su usuario o correo electrónico.</p><form noValidate className={validated ? 'was-validated' : ''} onSubmit={submit}><label className="form-label"><RequiredLabel>Usuario o correo</RequiredLabel></label><div className="input-icon mb-3"><FaEnvelope /><input required className="form-control" value={usuarioOCorreo} onChange={e => setUsuarioOCorreo(e.target.value)} /></div><button className="btn btn-primary w-100" disabled={loading}><FaPaperPlane className="me-2" />{loading ? 'Enviando...' : 'Enviar solicitud'}</button></form><Link to="/login" className="d-block text-center mt-3">Volver al login</Link></div></div>;
}
