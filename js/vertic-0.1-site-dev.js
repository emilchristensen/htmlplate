/*
 * Vertic JS - Site functional wrapper
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 *
 * Date: Tue Jan 31 12:00:00 2012 +0200
 */
(function(_v,jQuery,Modernizr){
	// Hook in to Vertic lib or create if unavailable
	_v  = typeof _v !== 'undefined' ? _v : typeof window._v !== 'undefined' ? window._v : new Object();
	
	// Hook in to 3rd party libs and make "normal" variable names available
	var jQuery = typeof jQuery !== 'undefined' ? jQuery : typeof window.jQuery !== 'undefined' ? window.jQuery : false;
	var $ = jQuery;
	var Modernizr = typeof Modernizr !== 'undefined' ? Modernizr : typeof window.Modernizr !== 'undefined' ? window.Modernizr : false;
	
	// Site init function - added to Vertic lib to make available in global scope without cluttering the namespace
	_v.init = function(){
		// Plugins
		
		// Behaviour
		// DOM ready
		$(document).ready(function() { 
			// Site logic
		});
	};
	
	_v.init();
})();