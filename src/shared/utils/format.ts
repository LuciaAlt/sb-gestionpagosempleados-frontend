export const money = (value?: number) =>
  new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(value ?? 0);

export const dateTime = (value?: string | Date) => {
  if (!value) return '';
  return new Intl.DateTimeFormat('es-DO', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
};
