require('ts-node').register({
  transpileOnly: true,
  module: 'NodeNext',
  compilerOptions: {
    moduleResolution: 'NodeNext',
    module: 'NodeNext',
  },

});
module.exports = require('./src');
