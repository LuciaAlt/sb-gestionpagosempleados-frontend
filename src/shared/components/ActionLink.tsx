import { IconType } from 'react-icons';

type Props = { icon: IconType; label: string; color?: string; onClick: () => void; disabled?: boolean };
export default function ActionLink({ icon: Icon, label, color = 'primary', onClick, disabled }: Props) {
  return (
    <button type="button" className={`action-link text-${color}`} onClick={onClick} disabled={disabled}>
      <Icon className="me-1" /> {label}
    </button>
  );
}
