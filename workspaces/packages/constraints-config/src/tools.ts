import { Workspace, Yarn } from '@yarnpkg/types/lib/constraints';
import { spawnSync } from 'child_process';

export function enforceFieldsOnAllWorkspaces(yarn: Yarn, fields: Record<string, any>) {
  for (const workspace of yarn.workspaces()) {
    for (const [field, value] of Object.entries(fields)) {
      workspace.set(field, typeof value === 'function' ? value(workspace) : value);
    }
  }
}

export function enforceGitLocationField(yarn: Yarn) {
  try {
    const gitUrl = spawnSync('git', ['config', '--get', 'remote.origin.url'], {
      encoding: 'utf-8',
    });
    const str = gitUrl.stdout.trim();
    if (str.length > 0) {
      enforceFieldsOnAllWorkspaces(yarn, {
        ['repository.type']: 'git',
        ['repository.url']: str.replace(/\.git$/, '').replace(/\/\/.*@/, '//'),
        ['repository.directory']: (workspace: Workspace) => workspace.cwd,
      });
    }
  } catch (_) {
    //do nothing
  }
}
