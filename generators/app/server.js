'use strict';
var utils = require('./utils');
var location = require('./location');

var prompts = [
  {
    type: 'input',
    name: 'listen',
    message: 'Http port',
    default: '80'
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
  promptAndGenerate: function(generator) {
    return generator.prompt(prompts).then(props => {
      return addLocation(generator, []).then(locations => {
        props.locations = locations;
        return utils.render(generator.templatePath('server.conf'), props);
      });
    });
  }
};
