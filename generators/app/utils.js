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
  }
};
