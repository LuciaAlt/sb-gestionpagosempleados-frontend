type Props = { children: React.ReactNode };
export default function RequiredLabel({ children }: Props) {
  return <>{children} <span className="text-danger">*</span></>;
}
