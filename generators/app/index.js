'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
// Module
const main = require('../shared/main');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the nginx configuration generator!'));
    this.log(
      'You launch the full generator, if you want presets choice, look at the following generator:'
    );
    this.log('\tnginx-conf:angular -> Preset for hosting an angular app');
    this.log(
      '\tnginx-conf:custom-server -> Preset for main and only dive in server config part'
    );
    this.log(
      '\tnginx-conf:server -> Only create a server file to be drop in /etc/nginx/conf.d'
    );
    return main.prompting(this).then(props => {
      this.props = props;
    });
  }

  writing() {
    main.writing(this, this.props);
  }
};
