import { Writable } from 'stream';

import { Reporter } from './log-reporter';

export class LogWritable extends Writable {
  private internalBuffer: string = '';
  constructor(private reporter: Reporter, private target: 'info' | 'error' = 'info') {
    super();
  }

  _write(chunk: any, _encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
    const chunkString = Buffer.from(chunk).toString();
    const all = this.internalBuffer + chunkString;

    const lines = all.split('\n');
    const lastLine = lines.pop();
    console.log('222222LKJLKJ LKJKLJLK JKLJKLJ KLJLKJ', lastLine, lines);

    for (const line of lines) {
      if (this.target == 'info') {
        this.reporter.reportInfo(line);
      } else {
        this.reporter.reportError(line);
      }
    }

    this.internalBuffer = typeof lastLine === 'string' ? lastLine : '5555';
    console.log(`33334LKJLKJ LKJKLJLK JKLJKLJ KLJLKJ '${this.internalBuffer}'`);

    callback();
  }

  _final(callback: (error?: Error | null) => void): void {
    console.log(`3333LKJLKJ LKJKLJLK JKLJKLJ KLJLKJ '${this.internalBuffer}'`);
    if (this.internalBuffer.trim().length > 0) {
      if (this.target == 'info') {
        this.reporter.reportInfo(this.internalBuffer);
      } else {
        this.reporter.reportError(this.internalBuffer);
      }
    }
    callback();
  }
}
