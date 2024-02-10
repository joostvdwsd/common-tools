import { Yarn } from '@yarnpkg/types/lib/constraints';

import { enforceGitLocationField } from './tools';
import { enforceConsistentDependenciesAcrossTheProject, enforceFilesForPublishedPackages, enforceWorkspaceDependencies, enforceWorkspaceRootPrivate } from './workspace';

export async function enforceGenericRules(yarn: Yarn) {
  enforceConsistentDependenciesAcrossTheProject(yarn);
  enforceWorkspaceDependencies(yarn);
  enforceWorkspaceRootPrivate(yarn);
  enforceFilesForPublishedPackages(yarn);
  enforceGitLocationField(yarn);
}
