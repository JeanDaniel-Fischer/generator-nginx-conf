'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
// Module
const server = require('../shared/server');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the nginx server section configuration generator!'));
    return server.promptAndGenerate(this).then(res => {
      this.res = res;
    });
  }

  writing() {
    this.fs.write('server.conf', this.res);
  }
};
