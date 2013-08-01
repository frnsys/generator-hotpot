# Generator-hotpot

A generator for Yeoman.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-hotpot`
- Run: `yo hotpot`
- After it's generated, run `grunt` to start the local server (defaults to
        port 8989)

## About
Hotpot is a boilerplate for simple static sites that may have some
additional fanciness such as canvas or other interactive components.

HTML markup is generated via [Jade](http://jade-lang.com/), CSS is
handled with [Sass](http://sass-lang.com/), and JS is helped with
[RequireJS](http://requirejs.org/).

Jade provides some niceities such as includes and in general is less of
a hassle to deal with than HTML.

It uses [Grunt](http://gruntjs.com/) for automation, which handles a number of things.

Grunt's default task, `grunt`, will start a local server on port 8989 in addition to a [LiveReload](http://livereload.com/)
server. It will watch the directories you will be working in for
changes, and accordingly compile Sass, Jade, and [Font
Custom](http://fontcustom.com/) fonts.

The Gruntfile also specifies a release task, `grunt release`, which will
perform JS and CSS linting, minify and concatenate JS and CSS, and
compress PNG and JPG images.

[Bower](http://bower.io/) is used for package management. It doesn't
integrate that well with RequireJS, unfortunately, and I'm considering
switching to [Jam](http://jamjs.org/) instead. For now, after you
install new packages, you can run the grunt task `grunt bower` which
will attempt to appropriately update the RequireJS config file. It
doesn't always work, so if you're running into errors with new packages,
    check those paths first.

## License
Hotpot is by Francis Tseng ([@frnsys](https://twitter.com/frnsys))

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
