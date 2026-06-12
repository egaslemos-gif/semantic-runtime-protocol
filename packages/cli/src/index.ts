#!/usr/bin/env node

import { Command } from 'commander';
import { lintCommand } from './commands/lint';
import { inspectCommand } from './commands/inspect';
import { verifyCommand } from './commands/verify';
import { diffCommand } from './commands/diff';

const program = new Command();

program
  .name('srp')
  .description('Semantic OS Governance CLI')
  .version('1.0.0-alpha');

program
  .command('lint')
  .description('Run Semantic Governance Analysis (detect scope leaks, cyclic logic, entropy)')
  .action(lintCommand);

program
  .command('inspect <canonical_id>')
  .description('Inspect a specific Canonical Node in the architecture')
  .action(inspectCommand);

program
  .command('verify <canonical_id>')
  .description('Execute traversal real testing consistency checks and governance overrides')
  .action(verifyCommand);

program
  .command('diff <buildA> <buildB>')
  .description('Analyze governance changes over time')
  .action(diffCommand);

program.parse(process.argv);
