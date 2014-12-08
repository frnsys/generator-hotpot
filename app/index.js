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
  this.copy('404.jade', '404.jade');
  this.copy('favicon.ico', 'favicon.ico');

  this.directory('inc', 'inc');
  this.directory('assets', 'assets');
  this.directory('src', 'src');
  this.directory('js', 'js');
};

HotpotGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('gitignore', '.gitignore');
  this.copy('bowerrc', '.bowerrc');
  this.copy('csslintrc', '.csslintrc');
  this.copy('jshintrc', '.jshintrc');
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

HotpotGenerator.prototype.h5bp = function h5bp() {
  var cb = this.async();

  this.remote('h5bp', 'html5-boilerplate', 'master', function(err, remote) {
      if (err) {
          return cb(err);
      }
      remote.copy('dist/.htaccess', '.htaccess');
      remote.copy('dist/crossdomain.xml', 'crossdomain.xml');
      remote.copy('dist/humans.txt', 'humans.txt');
      remote.copy('dist/robots.txt', 'robots.txt');
      cb();
  }, true);
};

HotpotGenerator.prototype.stylesheets = function stylesheets() {
    var cb = this.async();

    this.remote('ftzeng', 'atomic', 'master', function(err, remote) {
        if (err) {
            return cb(err);
        }
        remote.directory('.', 'css/');
        cb();
    }, true);
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

