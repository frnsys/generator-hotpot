'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var HotpotGenerator = module.exports = function HotpotGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(HotpotGenerator, yeoman.generators.Base);

HotpotGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(hotpot);

  var prompts = [{
    type: 'input',
    name: 'projectName',
    message: 'What is your project\'s name?',
    default: 'Hotpot'
  }];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

HotpotGenerator.prototype.app = function app() {
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
  this.copy('index.jade', 'index.jade');
  this.copy('favicon.ico', 'favicon.ico');

  this.directory('includes', 'includes');
  this.directory('assets', 'assets');
  this.directory('source', 'source');
  this.directory('scripts', 'scripts');
};

HotpotGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('gitignore', '.gitignore');
  this.copy('bowerrc', '.bowerrc');
  this.copy('csslintrc', '.csslintrc');
  this.copy('jshintrc', '.jshintrc');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

HotpotGenerator.prototype.stylesheets = function stylesheets() {
    var cb = this.async();

    this.remote('ftzeng', 'atomic', function(err, remote) {
        if (err) {
            return cb(err);
        }
        remote.directory('.', 'styles/');
        cb();
    });
};

var hotpot =
'\n\t    )    )        (       )             '.red+
'\n\t( /( ( /(   *   ))\\ ) ( /(   *   )     '.red+
'\n\t )\\()))\\())` )  /(()/( )\\())` )  /(  '.red+
'\n\t((_)\\((_)\\  ( )(_))(_)|(_)\\  ( )(_)) '.red+
'\n\t _((_) ((_)(_(_()|_))   ((_)(_(_())     '.red+
'\n\t| || |/ _ \\|_   _| _ \\ / _ \\|_   _|  '.yellow+
'\n\t| __ | (_) | | | |  _/| (_) | | |       '.yellow+
'\n\t|_||_|\\___/  |_| |_|   \\___/  |_|     '.yellow+
'\n\n\t       [A Yeoman generator]\n\n';

