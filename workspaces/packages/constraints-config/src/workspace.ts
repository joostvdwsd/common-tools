import { Yarn } from '@yarnpkg/types/lib/constraints';

export function enforceConsistentDependenciesAcrossTheProject(yarn: Yarn) {
  for (const dependency of yarn.dependencies()) {
    if (dependency.type === 'peerDependencies')
      continue;

    for (const otherDependency of yarn.dependencies({ ident: dependency.ident })) {
      if (otherDependency.type === 'peerDependencies')
        continue;

      dependency.update(otherDependency.range);
    }
  }
}

export function enforceWorkspaceDependencies(yarn: Yarn) {
  for (const dependency of yarn.dependencies()) {
    if (dependency.resolution?.workspace) {
      dependency.update('workspace:^');
    }
  }
}

export function enforceWorkspaceRootPrivate(yarn: Yarn) {
  for (const workspace of yarn.workspaces()) {
    if (workspace.manifest?.workspaces) {
      workspace.set('private', true);
    }
  }
}

export function enforceFilesForPublishedPackages(yarn: Yarn) {
  for (const workspace of yarn.workspaces()) {
    if (workspace.manifest.private !== true) {
      const files = workspace.manifest.files ?? [];
      if (files.length === 0) {
        workspace.error('Public packages should contain a files section');
      }
    }
  }
}
