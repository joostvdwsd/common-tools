import { Chars } from './constants';
import { LogReporter } from './log-reporter';
import { PLATFORM } from './platform';
import { Colors } from './style-utils';

export class Section {
  reporter: LogReporter;
  startTime = new Date();

  constructor(private parentReporter: LogReporter, public title: string) {
    if (this.parentReporter.level === 0) {
      parentReporter.reportInfo(`${Chars.startGroup} ${title}`);
    } else {
      parentReporter.writeLine(parentReporter.prefix(title, Colors.info, `${Chars.startGroup} `));
    }

    if (PLATFORM?.start && parentReporter.level <= 1) {
      parentReporter.writeLine(PLATFORM.start(title));
    }

    this.reporter = new LogReporter({
      parentReporter,
      level: parentReporter.level + 1,
      stdout: parentReporter.p,
    });
    // const section = {
    //   startTime: new Date(),
    //   title,
    //   reporter: new LogReporter({
    //     parentReporter: this,
    //     level: this.level + 1,
    //     stdout: this.parentStdout,
    //     stderr: this.parentStderr,
    //     useColors: this.useColors,
    //   }),
    //   end: () => {
    //     this.endSection(section);
    //   },
    // };
  }

  end() {

  }
}
