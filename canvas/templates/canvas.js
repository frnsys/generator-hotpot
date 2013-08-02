define([
       'jquery'
], function($) {
    function Canvas() {
        this.canvas = document.getElementById('canvas'),
        this.ctx = this.canvas.getContext('2d');

        // Get the proper requestAnimationFrame.
        // Thanks http://bit.ly/13vtjf7
        var vendors = ['ms','moz','webkit','o'];
        for (var i = 0; i < vendors.length && !window.requestAnimationFrame; i++) {
            window.requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
        }

        // Setup devicePixelRatio.
        window.devicePixelRatio = window.devicePixelRatio || 1;

        // Listen for window resize
        // and resize the canvas.
        $(window).on('resize.canvas', this.calibrate.bind(this), false);

        this.setup();
        this.calibrate();
    }

    // General setup
    Canvas.prototype.setup = function() {
        // Setup
    }

    // Draw loop
    Canvas.prototype.draw = function() {
        // Draw
    }

    // Setup the canvas for retina support.
    Canvas.prototype.retinatize = function() {
        var el   = $('#canvas'),
            el_w = this.canvas.width,
            el_h = this.canvas.height;
        el.attr('width', el_w * window.devicePixelRatio);
        el.attr('height', el_h * window.devicePixelRatio);
        el.css('width', el_w);
        el.css('height', el_h);
    }

    // Calibrate the canvas.
    Canvas.prototype.calibrate = function() {
        // Set the canvas to full window.
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Re-retinatize the canvas.
        this.retinatize();

        // Draw to reflect calibration.
        this.draw();
    }

    // Animate the canvas.
    Canvas.prototype.animate = function() {
        // Call this on each new frame.
        this.animation = window.requestAnimationFrame(ø.animate.bind(ø));
        this.draw();
    }

    return Canvas;
});
