/** @type {import('@yarnpkg/types')} */
const { defineConfig } = require('@yarnpkg/types');

const { enforceGenericRules, enforceFieldsOnAllWorkspaces, enforceGenericJsii } = require('@cp-utils/constraints-config/local');

module.exports = defineConfig({

  async constraints({ Yarn }) {
    await enforceGenericRules(Yarn);
    await enforceGenericJsii(Yarn);

    enforceFieldsOnAllWorkspaces(Yarn, {
      ['engines.node']: '>=18.12.0',
      private: workspace => {
        if (workspace.cwd.startsWith('workspaces/packages') || workspace.cwd.startsWith('workspaces/utils')) {
          return undefined;
        }
        return true;
      },
    });
  },
});
