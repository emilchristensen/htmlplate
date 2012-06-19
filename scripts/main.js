/*
 * Vertic JS - Site functional wrapper
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 *
 * Date: Tue Jan 31 12:00:00 2012 +0200
 * Modified: Tue Jun 19 16:00:00 2012 +0200
 */

/*
 * A note on how to include external libraries:
 *
 * define(['jquery'], function ($) {
 *   //Script contents go here.
 * });
 *
 */

require(["libs/jquery-1.7.2-vsdoc", "tools/vertic-dev"], function($, dev) {
	/*
	 * Load Modernizr the old school way
	 * TO DO: Make Modernizr load with the AMD paradigm
	 */
	var Modernizr = typeof Modernizr !== 'undefined' ? Modernizr : typeof window.Modernizr !== 'undefined' ? window.Modernizr : false;

	// DOM ready
	$(function() {
		// Site logic goes here
		dev.log('DOM is ready!');
	});
});
