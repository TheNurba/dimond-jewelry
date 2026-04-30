export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value) + ' сом';
}

export function cn(...args: Array<string | false | null | undefined>): string {
  return args.filter(Boolean).join(' ');
}
