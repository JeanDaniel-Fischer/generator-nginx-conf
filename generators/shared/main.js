'use strict';
var server = require('./server');
var utils = require('./utils');

var prompt = [
  {
    type: 'input',
    name: 'user',
    message: 'User for nginx process',
    default: 'nginx'
  },
  {
    type: 'input',
    name: 'worker',
    message: 'Amount of worker (should be number of process)',
    default: 'auto'
  },
  {
    type: 'input',
    name: 'error_log',
    message: 'Error log file',
    default: '/var/log/nginx/error.log'
  },
  {
    type: 'list',
    name: 'error_log_level',
    message: 'Error level',
    default: 'error',
    choices: ['info', 'notice', 'warn', 'error', 'crit', 'alert', 'emerg']
  },
  {
    type: 'input',
    name: 'mime',
    message: 'Mime types config',
    default: '/etc/nginx/mime.types'
  },
  {
    type: 'input',
    name: 'accesslog',
    message: 'Path to access log',
    default: '/var/log/nginx/access.log'
  },
  {
    type: 'list',
    name: 'gzip',
    message: 'Gzip compression',
    default: 'on',
    choices: ['on', 'off']
  }
];

module.exports = {
  prompting: function(generator, preset) {
    var prompts = prompt;
    if (preset !== undefined) {
      prompts = utils.copyDefaultAndReturnMissing(prompts, preset);
    }
    return generator.prompt(prompts).then(props => {
      if (preset !== undefined) {
        Object.assign(props, preset);
      }
      return server
        .promptAndGenerate(generator, preset, props.locations)
        .then(serverSection => {
          props.server = utils.indent(1, serverSection);
          return props;
        });
    });
  },
  writing: function(generator, props) {
    generator.fs.copyTpl(
      generator.templatePath('../../shared/templates/nginx.conf'),
      generator.destinationPath('nginx.conf'),
      props
    );
  }
};
