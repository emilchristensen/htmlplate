/*
 * Vertic JS utility library - Services
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Tue Jan 31 12:00:00 2012 +0200
 */
(function(jQuery){
	// Set up object
	var vertic = window._v;
	
	// Hook in to 3rd party libs
	var jQuery = typeof jQuery !== 'undefined' ? jQuery : typeof window.jQuery !== 'undefined' ? window.jQuery : false;
	var $ = jQuery;
	
	// Set up service utilities
	vertic.services = {
		request:function(url,data,win,lose) {
			if (typeof data !== 'object') data = {};
			if (typeof win === 'undefined') var win = function(resp){ _v.log(resp); };
			if (typeof lose === 'undefined') var lose = function(resp){ _v.err(resp); };
			$.ajax({
				url:url,
				data:JSON.stringify(data),
				dataType:'json',
				type:'post',
				complete:function(jqxhr,ts){
					if (ts === "success") {
						var resp = jqxhr.responseText;
						if (resp) {
							resp = JSON.parse(resp);
							if (resp.Outcome.Success === true || allowErr) {
								_v.log(resp);
								win(resp);
							} else {
								_v.err(resp, 'Service error', jqxhr.responseText);
								lose(resp);
							}
						} else {
							_v.err(jqxhr, 'Response format error', resp);
						}
					} else {
						_v.err(jqxhr, 'Ajax request error', ts);
					}
				}
			});
		}
	};
	
	// Shortcuts
	vertic.request = function() { return vertic.services.request.apply(vertic.services.request,arguments); };
	
	// Expose library
	window._v = vertic;
})();