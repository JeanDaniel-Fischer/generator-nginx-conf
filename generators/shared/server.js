'use strict';
var utils = require('./utils');
var location = require('./location');

var prompts = [
  {
    type: 'input',
    name: 'listen',
    message: 'Http port',
    default: '80 http2'
  },
  {
    type: 'input',
    name: 'hostname',
    message: 'List of hostname (blank space separated)',
    default: 'localhost 127.0.0.1'
  },
  {
    type: 'input',
    name: 'root',
    message: 'Root of server files',
    default: ''
  },
  {
    type: 'input',
    name: 'index',
    message: 'Index name',
    default: 'index.html index.htm'
  }
];

var promptAddLocation = [
  {
    type: 'confirm',
    name: 'add',
    message: 'Do you want to add a location',
    default: false
  }
];

function addLocation(generator, locations) {
  return generator.prompt(promptAddLocation).then(p => {
    if (p.add) {
      return location.createLocation(generator).then(loc => {
        locations.push(utils.indent(1, loc));
        return addLocation(generator, locations);
      });
    }
    return locations;
  });
}

module.exports = {
  promptAndGenerate: function(generator, preset, presetLocations) {
    var computePrompt = prompts;
    if (preset !== undefined) {
      computePrompt = utils.copyDefaultAndReturnMissing(prompts, preset);
    }
    return generator.prompt(computePrompt).then(props => {
      if (preset !== undefined) {
        Object.assign(props, preset);
      }
      if (presetLocations !== undefined) {
        props.locations = presetLocations;
        return utils.render(
          generator.templatePath('../../shared/templates/server.conf'),
          props
        );
      }
      return addLocation(generator, []).then(locations => {
        props.locations = locations;
        return utils.render(
          generator.templatePath('../../shared/templates/server.conf'),
          props
        );
      });
    });
  }
};
