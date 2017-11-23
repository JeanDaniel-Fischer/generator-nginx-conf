'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');
// Module
const main = require('../shared/main');
const location = require('../shared/location');
const utils = require('../shared/utils');

const preset = {
  // main section
  user: null,
  worker: null,
  error_log: null,
  error_log_level: null,
  mime: null,
  accesslog: null,
  gzip: null,
  // server section
  listen: null,
  index: null,
  locations: []
};

const presetCacheImages = {
  pattern: 'images',
  expire: 'max'
}
const presetCacheFonts = {
  pattern: 'fonts',
  expire: 'max'
}
const presetCacheJson = {
  pattern: 'script',
  expire: 'max'
}
const presetTry = {
  matcher: '/',
  file: '$uri /index.html'
}
module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the nginx angular specific configuration generator!'));
    var curPreset = Object.assign({}, preset);

    // All locations
    return location.cache(this, presetCacheImages).then(resCI => {
      curPreset.locations.push(utils.indent(1, resCI));
    }).then( () => {
      return location.cache(this, presetCacheFonts);
    }).then(resCF => {
      curPreset.locations.push(utils.indent(1, resCF));
    }).then( () => {
      return location.cache(this, presetCacheJson);
    }).then(resJson => {
      curPreset.locations.push(utils.indent(1, resJson));
    }).then( () => {
      return location.tryfiles(this, presetTry);
    }).then(resT => {
      curPreset.locations.push(utils.indent(1, resT));
    }).then( () => {
      return main.prompting(this, curPreset).then(props => {
        this.props = props;
      });
    });
  }

  writing() {
    main.writing(this, this.props);
  }
};
