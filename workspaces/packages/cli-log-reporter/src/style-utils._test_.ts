import { Chars } from './constants';
import { Colors, Render } from './style-utils';

describe('Style utils', () => {
  it('Should render the prefix correct', () => {
    expect(Render.prefix('hello 1', 0, Colors.warning)).toBe(
      `${Colors.warning(Chars.caret)} ${Chars.dot} hello 1`,
    );

    expect(Render.prefix('hello 2', 1, Colors.warning)).toBe(
      `${Colors.warning(Chars.caret)} ${Chars.group} hello 2`,
    );

    expect(Render.prefix('hello 3', 2, Colors.warning)).toBe(
      `${Colors.warning(Chars.caret)} ${Chars.group} ${Chars.group} hello 3`,
    );
  });
});
