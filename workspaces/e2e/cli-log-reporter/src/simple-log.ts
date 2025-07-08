import { LogReporter } from 'cli-log-reporter';

const reporter = new LogReporter();

reporter.reportHeader('E2E Test');
// reportAll(reporter);

const section = reporter.beginSection('Section 1');
// reportAll(section.reporter);
section.end();

const section2 = reporter.beginSection('Section 2');
// reportAll(section2.reporter);
section2.reporter.stdout().write('HKJHKJHKJHHKJHJKHK');
const section3 = section2.reporter.beginSection('Section 3');
// reportAll(section3.reporter);
section3.end();
// const section4 = section2.reporter.beginSection('Section 4');
// execCommand(section4.reporter).then(() => {
//   section4.end();
//   section2.end();
// });

section2.end();
// function reportAll(reporter: Reporter) {
//   reporter.reportDebug('debug line');
//   reporter.reportInfo('info line');
//   reporter.reportWarning('warning line');
//   reporter.reportError('error line');
// }


// async function execCommand(reporter: Reporter) {
//   return new Promise((resolve, _reject) => {
//     reporter.reportInfo('$ls -la --color=always /');
//     reporter.reportInfo('');
//     const prod = spawn('ls', ['-la', '--color=always', '/']);
//     prod.stdout.pipe(reporter.stdout());
//     prod.stderr.pipe(reporter.stderr());
//     prod.on('exit', code => {
//       reporter.reportInfo('');
//       reporter.reportInfo(`Finished with status ${code}`);
//       resolve(null);
//     });
//   });
// }
