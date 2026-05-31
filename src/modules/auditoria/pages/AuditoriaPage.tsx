import { useEffect, useState } from 'react';
import { Button, Card, Collapse, Form, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FaBroom, FaFilter, FaSearch } from 'react-icons/fa';
import { auditoriaService } from '../services/auditoriaService';
import { AuditFilter, AuditItem } from '../models/AuditoriaModels';
import PaginationLite from '../../../shared/components/PaginationLite';
import { dateTime } from '../../../shared/utils/format';

export default function AuditoriaPage() {
  const [items, setItems] = useState<AuditItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [take, setTake] = useState(10);
  const [filters, setFilters] = useState<AuditFilter>({});
  const [panel, setPanel] = useState(false);
  const load = async () => {
    try {
      const d = await auditoriaService.paginate(page, take, filters);
      setItems(d.items || []);
      setTotal(d.total || 0);
      setPages(d.pages || 0);
    } catch (e: any) {
      Swal.fire(
        "Error",
        e.friendlyMessage || "No fue posible cargar auditoría.",
        "error"
      );
    }
  };
  useEffect(() => {
    load();
  }, [page, take]);
  const search = () => {
    setPage(1);
    load();
  };
  const clear = () => {
    setFilters({});
    setPage(1);
    setTimeout(load, 0);
  };
  return (
    <Card className="content-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Auditoría</h4>
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
                  placeholder="Usuario"
                  value={filters.usuarioRegistra || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, usuarioRegistra: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2">
                <Form.Control
                  placeholder="Acción"
                  value={filters.accion || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, accion: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2">
                <Form.Control
                  placeholder="Entidad"
                  value={filters.entidad || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, entidad: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2">
                <Form.Control
                  placeholder="Entidad Id"
                  value={filters.entidadId || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, entidadId: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2">
                <Form.Control
                  type="date"
                  value={filters.fechaDesde || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, fechaDesde: e.target.value })
                  }
                />
              </div>
              <div className="col-md-2">
                <Form.Control
                  type="date"
                  value={filters.fechaHasta || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, fechaHasta: e.target.value })
                  }
                />
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
              <th>Usuario</th>
              <th>Acción</th>
              <th style={{ minWidth: '180px' }}>Entidad</th>
              <th style={{ minWidth: '185px' }}>Entidad Id</th>
              <th>Detalle</th>
              <th>IP</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {items.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.usuarioRegistra}</td>
                <td>{x.accion}</td>
                <td>{x.entidad}</td>
                <td>{x.entidadId}</td>
                <td>{x.detalle}</td>
                <td>{x.ip}</td>
                <td>{dateTime(x.fecha)}</td>
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
      </Card.Body>
    </Card>
  );
}
