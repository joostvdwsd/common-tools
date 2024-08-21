import { colorize } from 'colorize-node';
import { Writable } from 'stream';

import { Chars } from './constants';
import { formatDuration } from './format-utils';
import { PLATFORM } from './platform';
import { Color, Colors, Style } from './style-utils';

export type SyncSectionRunner = (logger: LogReporter) => void;
export type AsyncSectionRunner = (logger: LogReporter) => Promise<void>;

export interface Reporter {
  beginSection(title: string): Section;
  endSection(section: Section): void;
  reportDebug(message: string): void;
  reportInfo(message: string): void;
  reportWarning(message: string, important: boolean): void;
  reportError(message: string, important: boolean): void;
}

export interface Section {
  title: string;
  startTime: Date;
  reporter: Reporter;
}

export interface LogReporterOptions {
  parentReporter?: Reporter;
  stdout?: Writable;
  stderr?: Writable;
  level?: number;
  useColors?: boolean;
}

export class LogReporter implements Reporter {
  private parentReporter?: Reporter;
  private useColors: boolean;
  private parentStdout: Writable;
  parentStderr: Writable;
  level = 0;

  constructor(private options?: LogReporterOptions) {
    this.parentReporter = options?.parentReporter;
    this.useColors = options?.useColors !== false;
    this.parentStdout = this.options?.stdout ?? process.stdout;
    this.parentStderr = this.options?.stderr ?? process.stderr;

    if (options?.level) {
      this.level = options.level;
    }
  }

  runSectionSync(title: string, runner: SyncSectionRunner) {
    const section = this.beginSection(title);
    runner(this);
    this.endSection(section);
  }

  async runSection(title: string, runner: AsyncSectionRunner) {
    let buffer = '';
    const logger = new LogReporter({
      level: this.level + 1,
      stdout: new Writable({
        write: (chunk, _encoding, next) => {
          buffer = buffer + chunk.toString();
          next();
        },
      }),
    });

    await runner(logger);
    const section = this.beginSection(title);

    this.parentStdout.write(buffer);

    this.endSection(section);
  }

  beginSection(title: string): Section {
    if (this.parentReporter) {
      this.reportInfo(`${Chars.startGroup} ${title}`);
    } else {
      this.writeLine(this.prefix(title, Colors.info, `${Chars.startGroup} `));
    }

    if (PLATFORM?.start && this.level <= 1) {
      this.parentStdout.write(PLATFORM.start(title));
    }
    return {
      startTime: new Date(),
      title,
      reporter: new LogReporter({
        parentReporter: this,
        level: this.level + 1,
        stdout: this.parentStdout,
        stderr: this.parentStderr,
        useColors: this.useColors,
      }),
    };
  }

  endSection(section: Section) {
    const duration = Date.now() - section.startTime.getTime();
    if (PLATFORM?.end) {
      this.parentStdout.write(PLATFORM.end(section.title));
    }

    const message = duration > 200 ? `Completed in ${formatDuration(duration)}` : 'Completed';

    if (this.parentReporter) {
      this.reportInfo(`${Chars.endGroup} ${message}`);
    } else {
      this.writeLine(this.prefix(message, Colors.info, `${Chars.endGroup} `));
    }
  }

  reportHeader(message: string) {
    this.writeLine(this.prefix(Style.header(message), colorize.whiteBright));
  }

  reportDebug(message: string) {
    this.writeLine(this.prefix(message, Colors.debug));
  }

  reportInfo(message: string) {
    this.writeLine(this.prefix(message, Colors.info));
  }

  reportWarning(message: string, important: boolean = false) {
    this.writeLine(this.prefix(message, Colors.warning));
    if (important) {
      PLATFORM?.warning?.(message);
    }
  }

  reportError(message: string, important: boolean = false) {
    this.writeLine(this.prefix(message, Colors.error));
    if (important) {
      PLATFORM?.error?.(message);
    }
  }

  writeLine(message: string) {
    this.parentStdout.write(`${message}\n`);
  }

  prefix(message: string, color: Color, zeroIndentText: string = `${Chars.dot} `) {
    const indentPrefix = this.level > 0 ? `${Chars.group} `.repeat(this.level) : `${zeroIndentText}`;
    return `${this.useColors ? color(Chars.caret) : Chars.caret} ${indentPrefix}${message}`;
  }
}
