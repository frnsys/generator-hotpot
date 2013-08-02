'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var CanvasGenerator = module.exports = function CanvasGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the canvas subgenerator with the argument ' + this.name + '.');
};

util.inherits(CanvasGenerator, yeoman.generators.NamedBase);

CanvasGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};
