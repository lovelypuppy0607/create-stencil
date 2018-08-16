import tc from 'turbocolor';
import { createApp } from './create-app';
import { runInteractive } from './interactive';
import { getStarterRepo } from './starters';

const USAGE_DOCS = `Usage:

npm init stencil [starter] [project-name]
`;

async function run() {
  let args = process.argv.slice(2);

  const autoRun = args.indexOf('--run') >= 0;
  const help = args.indexOf('--help') >= 0 || args.indexOf('-h') >= 0;

  args = args.filter(a => a[0] !== '-');

  if (help) {
    console.log(USAGE_DOCS);
    return 0;
  }
  try {
    if (args.length === 2) {
      await createApp(
        getStarterRepo(args[0]),
        args[1],
        autoRun
      );

    } else if (args.length < 2) {
      await runInteractive(args[0], autoRun);

    } else {
      throw new Error(USAGE_DOCS);
    }
  } catch (e) {
    console.error(`\n${tc.red('✖')} ${e.message}\n`);
    process.exit(-1);
  }
}

run();
