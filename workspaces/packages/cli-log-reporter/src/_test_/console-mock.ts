import { expect } from '@jest/globals';

const systemStds = {
  stdout: process.stdout.write,
  stderr: process.stderr.write,
};

export class ConsoleMock {
  stdoutData: Buffer;
  stderrData: Buffer;
  stdData: Buffer;

  constructor(private echo: boolean) {
    this.stdoutData = Buffer.from('');
    this.stderrData = Buffer.from('');
    this.stdData = Buffer.from('');
    this.enable();
  }

  private stdoutWrite(str: string | Uint8Array): boolean {
    this.stdoutData = Buffer.concat([this.stdoutData, Buffer.from(str)]);
    this.stdData = Buffer.concat([this.stdData, Buffer.from(str)]);
    if (this.echo) {
      systemStds.stdout(str);
    }

    return true;
  }

  private stderrWrite(str: string | Uint8Array): boolean {
    this.stderrData = Buffer.concat([this.stderrData, Buffer.from(str)]);
    this.stdData = Buffer.concat([this.stdData, Buffer.from(str)]);
    if (this.echo) {
      systemStds.stderr(str);
    }

    return true;
  }

  enable() {
    process.stdout.write = (str: string) => this.stdoutWrite(str);
    process.stderr.write = (str: string) => this.stderrWrite(str);
  }

  disable() {
    process.stdout.write = systemStds.stdout;
    process.stderr.write = systemStds.stderr;
  }
}

expect.extend({
  toIncludeOutput(received: Buffer, expected: string | string[] | Buffer) {
    let buffer: Buffer;
    if (typeof expected === 'string') {
      buffer = Buffer.from(expected);
    } else if (Array.isArray(expected)) {
      buffer = Buffer.from(expected.join('\n'));
    } else {
      buffer = expected;
    }

    if (received.includes(buffer)) {
      return {
        message: () =>
          `Expected: ${this.utils.printExpected(buffer.toString())}\nReceived: ${this.utils.printReceived(received.toString())}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `Expected: ${this.utils.printExpected(buffer.toString())}\nReceived: ${this.utils.printReceived(received.toString())}`,
        pass: false,
      };
    }
  },
});

declare module 'expect' {
  interface AsymmetricMatchers {
    toIncludeOutput(expected: string | string[] | Buffer): void;
  }
  interface Matchers<R> {
    toIncludeOutput(expected: string | string[] | Buffer): R;
  }
}

export const cliMock = new ConsoleMock(false);
