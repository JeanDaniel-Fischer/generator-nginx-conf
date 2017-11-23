'use strict';
var utils = require('./utils');

function promptAndGenerate(prompts, generator, templatePath, preset) {
  var computePrompt = prompts;
  if (preset !== undefined) {
    computePrompt = utils.copyDefaultAndReturnMissing(prompts, preset);
  }
  return generator.prompt(computePrompt).then(props => {
    if (preset !== undefined) {
      Object.assign(props, preset);
    }
    props.pattern = convertPattern(props);
    return utils.render(
      generator.templatePath('../../shared/templates/' + templatePath),
      props
    );
  });
}

function convertPattern(props) {
  if (props.pattern === 'images') {
    return 'bmp|gif|jpeg|jpg|jxr|hdp|wdp|png|svg|svgz|tif|tiff|wbmp|webp|jng|cur|ico';
  }
  if (props.pattern === 'fonts') {
    return 'woff|woff2|eot|ttf|ttc|otf';
  }
  if (props.pattern === 'styles') {
    return 'css';
  }
  if (props.pattern === 'script') {
    return 'js';
  }
  if (props.pattern === 'static') {
    return 'html|htm|shtml';
  }
  return null;
}

var promptCache = [
  {
    type: 'list',
    name: 'pattern',
    message: 'List of file extension concerned',
    default: 'images',
    choices: ['images', 'fonts', 'styles', 'static', 'script']
  },
  {
    type: 'input',
    name: 'expire',
    message: 'Cache duration for selected files',
    default: '15d'
  }
];

var promptTry = [
  {
    type: 'input',
    name: 'matcher',
    message: 'Url matcher',
    default: ''
  },
  {
    type: 'input',
    name: 'file',
    message: 'Uri to try on disc',
    default: '$uri index.html'
  }
];

var promptMatcher = [
  {
    type: 'input',
    name: 'matcher',
    message: 'Url matcher',
    default: ''
  }
];

var promptLocationType = [
  {
    type: 'list',
    name: 'type',
    message: 'What kind of location you want to add?',
    default: 'try',
    choices: ['cache', 'try', 'index', 'deny']
  }
];

module.exports = {
  createLocation: function(generator) {
    return generator.prompt(promptLocationType).then(p => {
      if (p.type === 'cache') {
        return this.cache(generator);
      }
      if (p.type === 'try') {
        return this.tryfiles(generator);
      }
      if (p.type === 'index') {
        return this.index(generator);
      }
      if (p.type === 'deny') {
        return this.deny(generator);
      }
      return null;
    });
  },
  cache: function(generator, preset) {
    return promptAndGenerate(promptCache, generator, 'location_cache.conf', preset);
  },
  index: function(generator, preset) {
    return promptAndGenerate(promptMatcher, generator, 'location_indexing.conf', preset);
  },
  deny: function(generator, preset) {
    return promptAndGenerate(promptMatcher, generator, 'location_deny.conf', preset);
  },
  tryfiles: function(generator, preset) {
    return promptAndGenerate(promptTry, generator, 'location_tryfiles.conf', preset);
  }
};
