/*
 * Vertic JS utility library - Services
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Date: Tue Jan 31 12:00:00 2012 +0200
 */
(function(jQuery,Modernizr){
	// Set up object
	var vertic = _v;
	
	// Set up services utilities
	vertic.services = {
		ajax:function(url,data,complete,allowErr){
		if (typeof data === 'undefined') data = {};
			if (typeof allowErr === 'undefined') allowErr = false;
			if (typeof complete === 'undefined') complete = function(resp){ try { console.log('autocb: '); console.log(resp) } catch (err) {} };
			/*console.log("ajax call");
			console.log(url);
			console.log(data);
			console.log(JSON.stringify(data));
			console.log("ajax waiting");/**/
			$.ajax({
				url:url,
				data:JSON.stringify(data),
				dataType:'json',
				type:'post',
				complete:function(jqxhr,ts){
					/*console.log("ajax return");
					console.log(jqxhr);
					console.log(ts);
					console.log("ajax done");/**/
					if (ts === "success") {
						var resp = jqxhr.responseText;
						if (resp) {
							resp = JSON.parse(resp);
							if (resp.Outcome.Success === true || allowErr) {
								complete(resp);
							} else {
								try { 
									console.log('Service error: ' + jqxhr.responseText);
								} catch (err) {}
							}
						} else {
							try { 
								console.log('Response format error: ' + resp);
							} catch (err) {}
						}
					} else {
						try { 
							console.log('Ajax request error: ' + ts);
						} catch (err) {}
					}
				}
			});
		}
	};
	
	// Hook in to 3rd party libs
	var $ = typeof jQuery !== 'undefined' ? jQuery : typeof window.jQuery !== 'undefined' ? window.jQuery : false;
	var Modernizr = typeof Modernizr !== 'undefined' ? Modernizr : typeof window.Modernizr !== 'undefined' ? window.Modernizr : false;
	
	// Expose library
	window._v = vertic;
})()