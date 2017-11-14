'use strict';
var ejs = require('ejs');
var fs = require('fs');

module.exports = {
  indent: function(amountIndent, str) {
    var spaces = '';
    for (var i = 0; i < amountIndent; ++i) {
      spaces += '    ';
    }
    return spaces + str.replace(/\n/g, '\n' + spaces);
  },
  render: function(templatePath, props) {
    return ejs.render(fs.readFileSync(templatePath, { encoding: 'utf8' }), props);
  },
  copyDefaultAndReturnMissing: function(all, preset) {
    var names = Object.keys(preset);
    for (var ps of names) {
      if (preset[ps] === null) {
        var found = all.find(function(value) {
          return ps === value.name;
        });
        preset[ps] = found === undefined ? null : found.default;
      }
    }
    var result = [];
    for (var prompt of all) {
      if (
        names.find(function(value) {
          return value === prompt.name;
        }) === undefined
      ) {
        result.push(prompt);
      }
    }
    return result;
  }
};
