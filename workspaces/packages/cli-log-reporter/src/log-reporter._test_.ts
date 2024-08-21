import { expect } from '@jest/globals';
import { colorize } from 'colorize-node';

import { cliMock } from './_test_/console-mock';
import { Chars } from './constants';
import { LogReporter } from './log-reporter';
import { Style } from './style-utils';

describe('Log reporter', () => {
  it('Should output normal logs', () => {
    const logger = new LogReporter({ useColors: false });
    logger.reportHeader('Hello!');
    logger.reportHeader('World');

    expect(cliMock.stdData).toIncludeOutput([
      logger.prefix(Style.header('Hello!'), colorize.whiteBright),
      logger.prefix(Style.header('World'), colorize.whiteBright),
    ]);
  });

  it('Should render sections', () => {
    const logger = new LogReporter({ useColors: false });
    const section = logger.beginSection('Section 1');
    section.reporter.reportInfo('Nested');
    logger.endSection(section);
    expect(cliMock.stdData).toIncludeOutput([
      `${Chars.caret} ${Chars.startGroup} Section 1`,
      `${Chars.caret} ${Chars.group} Nested`,
      `${Chars.caret} ${Chars.endGroup} Completed`,
    ]);
  });


  it('Should render nested sections', () => {
    const logger = new LogReporter({ useColors: false });
    const section = logger.beginSection('Section 2');
    section.reporter.reportInfo('Nested');
    const nestedSection = section.reporter.beginSection('Nested section');
    nestedSection.reporter.reportInfo('Nested 2');
    section.reporter.endSection(nestedSection);
    logger.endSection(section);


    expect(cliMock.stdData).toIncludeOutput([
      `${Chars.caret} ${Chars.startGroup} Section 2`,
      `${Chars.caret} ${Chars.group} Nested`,
      `${Chars.caret} ${Chars.group} ${Chars.startGroup} Nested section`,
      `${Chars.caret} ${Chars.group} ${Chars.group} Nested 2`,
      `${Chars.caret} ${Chars.group} ${Chars.endGroup} Completed`,
      `${Chars.caret} ${Chars.endGroup} Completed`,
    ]);
  });
});
