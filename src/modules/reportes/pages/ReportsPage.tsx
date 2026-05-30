import { useEffect, useState } from 'react';
import { Button, Card, Collapse, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FaBroom, FaFileExcel, FaFilePdf, FaFilter, FaSearch } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { reportService } from '../services/reportService';
import { CatalogItem } from '../../rrhh/models/EmployeeModels';
import { ReportDto } from '../models/ReportModels';
import { money, dateTime } from '../../../shared/utils/format';
import { useAuth } from '../../seguridad/components/AuthContext';
import { PERMISOS } from '../../../shared/utils/permissions';

export default function ReportsPage() {
  const { can } = useAuth(); const [types, setTypes] = useState<CatalogItem[]>([]); const [tipo, setTipo] = useState(0); const [panel, setPanel] = useState(false); const [report, setReport] = useState<ReportDto | null>(null);
  useEffect(() => { reportService.employeeTypes().then(setTypes); }, []);
  const generate = async () => { try { const d = await reportService.weeklyByType(tipo); d.totalEmpleados = d.items?.length ?? d.totalEmpleados; setReport(d); } catch(e:any) { Swal.fire('Error', e.friendlyMessage || 'No fue posible generar el reporte.', 'error'); } };
  const rows = report?.items || [];
  const exportExcel = () => { const data = rows.map(x => ({ Código: x.employeeId, 'Nombre Completo': x.nombreCompleto, 'Número Seguro Social': x.numeroSeguroSocial, Departamento: x.departamento, 'Tipo Empleado': x.tipoEmpleadoNombre, 'Detalle Cálculo': x.detalleCalculo, 'Pago Semanal': x.pagoSemanal })); const ws = XLSX.utils.json_to_sheet(data); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Reporte'); XLSX.writeFile(wb, 'ReporteSemanalTipoEmpleado.xlsx'); };
  const exportPdf = () => { const doc = new jsPDF('landscape'); doc.text('Reporte Semanal por Tipo de Empleado', 14, 14); autoTable(doc, { startY: 20, head: [['Código','Nombre Completo','Seguro Social','Departamento','Tipo Empleado','Detalle','Pago Semanal']], body: rows.map(x => [x.employeeId, x.nombreCompleto, x.numeroSeguroSocial, x.departamento, x.tipoEmpleadoNombre, x.detalleCalculo, money(x.pagoSemanal)]) }); doc.save('ReporteSemanalTipoEmpleado.pdf'); };
  return <Card className="content-card"><Card.Body><div className="d-flex justify-content-between align-items-center mb-3"><h4>Reporte Semanal por Tipo de Empleado</h4>{can(PERMISOS.REPORTES_EXPORTAR) && <div><Button variant="success" className="me-2" disabled={!rows.length} onClick={exportExcel}><FaFileExcel className="me-2"/>Excel</Button><Button variant="danger" disabled={!rows.length} onClick={exportPdf}><FaFilePdf className="me-2"/>PDF</Button></div>}</div><div className="text-end mb-3"><Button variant="outline-primary" onClick={() => setPanel(!panel)}><FaFilter className="me-2"/>Filtros</Button></div><Collapse in={panel}><div className="filter-panel mb-3"><div className="row g-2 align-items-end"><div className="col-md-8"><Form.Label>Tipo de Empleado</Form.Label><Form.Select value={tipo} onChange={e => setTipo(Number(e.target.value))}><option value={0}>Todos</option>{types.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}</Form.Select></div><div className="col-md-4 text-end"><Button className="me-2" onClick={generate}><FaSearch className="me-2"/>Buscar</Button><Button variant="secondary" onClick={() => { setTipo(0); setReport(null); }}><FaBroom className="me-2"/>Limpiar</Button></div></div></div></Collapse>{report && <div className="row g-3 mb-3"><div className="col-md-4"><div className="stat-card"><span>Fecha Generación</span><strong>{dateTime(report.fechaGeneracion)}</strong></div></div><div className="col-md-4"><div className="stat-card"><span>Total Empleados</span><strong>{rows.length}</strong></div></div><div className="col-md-4"><div className="stat-card"><span>Total Pagado</span><strong>{money(report.totalPagado)}</strong></div></div></div>}<Table responsive hover><thead><tr><th>Código</th><th>Nombre Completo</th><th>Número Seguro Social</th><th>Departamento</th><th>Tipo Empleado</th><th>Detalle Cálculo</th><th>Pago Semanal</th></tr></thead><tbody>{rows.map(x => <tr key={x.employeeId}><td>{x.employeeId}</td><td>{x.nombreCompleto}</td><td>{x.numeroSeguroSocial}</td><td>{x.departamento}</td><td>{x.tipoEmpleadoNombre}</td><td>{x.detalleCalculo}</td><td>{money(x.pagoSemanal)}</td></tr>)}</tbody></Table></Card.Body></Card>;
}
