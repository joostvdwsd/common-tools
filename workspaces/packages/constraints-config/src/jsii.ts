import { Workspace, Yarn } from '@yarnpkg/types/lib/constraints';

function isJsiiWorkspace(workspace: Workspace) {
  return workspace.pkg.dependencies.has('jsii');
}

export function enforceJsiiFields(yarn: Yarn) {
  for (const workspace of yarn.workspaces()) {
    if (isJsiiWorkspace(workspace)) {
      const name = workspace.pkg.ident.replace('@', '');

      const [scope, packageName] = name.split('/');

      if (scope && packageName) {
        workspace.set('jsii', {
          outdir: 'dist',
          versionFormat: 'short',
          targets: {
            java: {
              package: `com.${name.replace(/\//g, '.').replace(/-/g, '_')}`,
              maven: {
                groupId: scope.replace(/-/g, '_'),
                artifactId: packageName.replace(/-/g, '_'),
              },
            },
            python: {
              distName: name.replace(/\//g, '.'),
              module: name.replace(/\//g, '.').replace(/-/g, '_'),
            },
          },
          tsc: {
            outDir: 'lib',
            rootDir: 'src',
          },
        });
      }
    }
  }
}

export function enforceJsiiFileInclusion(yarn: Yarn) {
  for (const workspace of yarn.workspaces()) {
    if (isJsiiWorkspace(workspace)) {
      const files: string[] = workspace.manifest.files ?? [];
      if (!files.includes('/.jsii')) {
        workspace.error('Files section of jssi package should include the .jsii manifest');
      }
    }
  }
}
export async function enforceGenericJsii(yarn: Yarn) {
  enforceJsiiFields(yarn);
  enforceJsiiFileInclusion(yarn);
}
