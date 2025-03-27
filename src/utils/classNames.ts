type MaybeClassName = string | undefined | null | false;

export const classNames = (...args: MaybeClassName[]): string => {
  return args.filter(arg => !!arg).join(' ');
}