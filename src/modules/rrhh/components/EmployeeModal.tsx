import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import RequiredLabel from '../../../shared/components/RequiredLabel';
import { CatalogItem, Employee, EmployeeRequest } from '../models/EmployeeModels';

type Props = { show: boolean; onHide: () => void; onSave: (payload: EmployeeRequest) => Promise<void>; employee?: Employee | null; departments: CatalogItem[]; types: CatalogItem[]; readonly?: boolean };
const empty: EmployeeRequest = { nombres: '', apellidos: '', numeroSeguroSocial: '', departamentoId: undefined, tipoEmpleadoId: 0, salarioSemanal: 0, sueldoPorHora: 0, horasTrabajadas: 0, ventasBrutas: 0, tarifaComision: 0, salarioBase: 0, activo: true };
export default function EmployeeModal({ show, onHide, onSave, employee, departments, types, readonly }: Props) {
  const [form, setForm] = useState<EmployeeRequest>(empty);
  const [validated, setValidated] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => { if (show) setForm(employee ? { ...empty, ...employee, departamentoId: employee.departamentoId || employee.departmento?.id } : empty); setValidated(false); }, [show, employee]);
  const selectedType = useMemo(() => types.find(t => t.id === Number(form.tipoEmpleadoId)), [types, form.tipoEmpleadoId]);
  const typeName = (selectedType?.nombre || '').toLowerCase();
  const showWeekly = typeName.includes('asalariado') && !typeName.includes('comisión') && !typeName.includes('comision');
  const showHourly = typeName.includes('hora');
  const showCommission = typeName.includes('comisión') || typeName.includes('comision');
  const showBase = showCommission && typeName.includes('asalariado');
  const cleanAmounts = (payload: EmployeeRequest): EmployeeRequest => ({ ...payload,
    salarioSemanal: showWeekly ? Number(payload.salarioSemanal || 0) : 0,
    sueldoPorHora: showHourly ? Number(payload.sueldoPorHora || 0) : 0,
    horasTrabajadas: showHourly ? Number(payload.horasTrabajadas || 0) : 0,
    ventasBrutas: showCommission ? Number(payload.ventasBrutas || 0) : 0,
    tarifaComision: showCommission ? Number(payload.tarifaComision || 0) : 0,
    salarioBase: showBase ? Number(payload.salarioBase || 0) : 0
  });
  const submit = async (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); setValidated(true); if (!e.currentTarget.checkValidity()) return; setSaving(true); try { await onSave(cleanAmounts(form)); onHide(); } finally { setSaving(false); } };
  const set = (k: keyof EmployeeRequest, v: any) => setForm(prev => ({ ...prev, [k]: v }));
  return <Modal show={show} onHide={onHide} size="lg" centered><Form noValidate className={validated ? 'was-validated' : ''} onSubmit={submit}><Modal.Header closeButton><Modal.Title>{readonly ? 'Detalle empleado' : employee ? 'Editar empleado' : 'Nuevo empleado'}</Modal.Title></Modal.Header><Modal.Body><Row className="g-3">
    {employee && <Col md={3}><Form.Label>Código</Form.Label><Form.Control value={employee.id} disabled /></Col>}
    <Col md={employee ? 5 : 6}><Form.Label><RequiredLabel>Nombres</RequiredLabel></Form.Label><Form.Control required disabled={readonly} value={form.nombres} onChange={e => set('nombres', e.target.value)} /></Col>
    <Col md={employee ? 4 : 6}><Form.Label><RequiredLabel>Apellidos</RequiredLabel></Form.Label><Form.Control required disabled={readonly} value={form.apellidos} onChange={e => set('apellidos', e.target.value)} /></Col>
    <Col md={6}><Form.Label><RequiredLabel>Número Seguro Social</RequiredLabel></Form.Label><Form.Control required disabled={readonly} value={form.numeroSeguroSocial} onChange={e => set('numeroSeguroSocial', e.target.value)} /></Col>
    <Col md={6}><Form.Label><RequiredLabel>Departamento</RequiredLabel></Form.Label><Form.Select required disabled={readonly} value={form.departamentoId || ''} onChange={e => set('departamentoId', Number(e.target.value))}><option value="">Seleccione</option>{departments.map(x => <option key={x.id} value={x.id}>{x.nombre}</option>)}</Form.Select></Col>
    <Col md={6}><Form.Label><RequiredLabel>Tipo Empleado</RequiredLabel></Form.Label><Form.Select required disabled={readonly} value={form.tipoEmpleadoId || ''} onChange={e => set('tipoEmpleadoId', Number(e.target.value))}><option value="">Seleccione</option>{types.map(x => <option key={x.id} value={x.id}>{x.nombre}</option>)}</Form.Select></Col>
    <Col md={6} className="d-flex align-items-end"><Form.Check type="switch" label="Activo" disabled={readonly} checked={!!form.activo} onChange={e => set('activo', e.target.checked)} /></Col>
    {showWeekly && <MoneyField label="Salario Semanal" value={form.salarioSemanal} onChange={v => set('salarioSemanal', v)} readonly={readonly} />}
    {showHourly && <><MoneyField label="Sueldo por Hora" value={form.sueldoPorHora} onChange={v => set('sueldoPorHora', v)} readonly={readonly} /><MoneyField label="Horas Trabajadas" value={form.horasTrabajadas} onChange={v => set('horasTrabajadas', v)} readonly={readonly} /></>}
    {showCommission && <><MoneyField label="Ventas Brutas" value={form.ventasBrutas} onChange={v => set('ventasBrutas', v)} readonly={readonly} /><MoneyField label="Tarifa Comisión" value={form.tarifaComision} onChange={v => set('tarifaComision', v)} readonly={readonly} /></>}
    {showBase && <MoneyField label="Salario Base" value={form.salarioBase} onChange={v => set('salarioBase', v)} readonly={readonly} />}
  </Row></Modal.Body><Modal.Footer><Button variant="secondary" onClick={onHide}>Cerrar</Button>{!readonly && <Button variant="primary" type="submit" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</Button>}</Modal.Footer></Form></Modal>;
}
function MoneyField({ label, value, onChange, readonly }: { label: string; value?: number; onChange: (v: number) => void; readonly?: boolean }) { return <Col md={4}><Form.Label><RequiredLabel>{label}</RequiredLabel></Form.Label><Form.Control required min={0} type="number" step="0.01" disabled={readonly} value={value ?? 0} onChange={e => onChange(Number(e.target.value))} /></Col>; }
