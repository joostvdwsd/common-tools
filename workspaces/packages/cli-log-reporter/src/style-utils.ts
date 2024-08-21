import { colorize } from 'colorize-node';

import { Chars } from './constants';

export type Color = (input: string | number | null | undefined) => string;

export const Colors: Record<string, Color> = {
  warning: colorize.yellowBright,
  error: colorize.redBright,
  info: colorize.blueBright,
  debug: colorize.greenBright,
};

export const Style = {
  header: (message: string) => {
    return colorize.bold(colorize.whiteBright(message));
  },
};

export const Render = {
  prefix: (message: string, indent: number, color: Color, zeroIndentText: string = `${Chars.dot} `) => {
    const indentPrefix = indent > 0 ? `${Chars.group} `.repeat(indent) : `${zeroIndentText}`;
    return `${color(Chars.caret)} ${indentPrefix}${message}`;
  },
};
