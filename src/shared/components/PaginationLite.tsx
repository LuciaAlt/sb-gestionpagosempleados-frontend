import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

type Props = { page: number; pages: number; take: number; total: number; onPage: (page: number) => void; onTake: (take: number) => void };
export default function PaginationLite({ page, pages, take, total, onPage, onTake }: Props) {
  const nums = Array.from({ length: pages }, (_, i) => i + 1).filter(p => Math.abs(p - page) <= 2 || p === 1 || p === pages);
  return (
    <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
      <small className="text-muted">Total: {total} registros | Página {page} de {pages || 1}</small>
      <div className="d-flex align-items-center gap-2">
        <select className="form-select form-select-sm page-size" value={take} onChange={e => onTake(Number(e.target.value))}>
          {[10, 20, 50].map(x => <option key={x} value={x}>{x}</option>)}
        </select>
        <button className="page-icon" disabled={page <= 1} onClick={() => onPage(1)}><FaAngleDoubleLeft /></button>
        <button className="page-icon" disabled={page <= 1} onClick={() => onPage(page - 1)}><FaAngleLeft /></button>
        {nums.map((n, i) => <button key={`${n}-${i}`} className={`page-number ${n === page ? 'active' : ''}`} onClick={() => onPage(n)}>{n}</button>)}
        <button className="page-icon" disabled={page >= pages} onClick={() => onPage(page + 1)}><FaAngleRight /></button>
        <button className="page-icon" disabled={page >= pages} onClick={() => onPage(pages)}><FaAngleDoubleRight /></button>
      </div>
    </div>
  );
}
