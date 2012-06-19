/*
 * Vertic JS utility library - Remote script loading
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Tue Jan 31 12:00:00 2012 +0200
 */
define(function() {
	var loadRemoteScript = function(src, callback) {
		var head = document.getElementsByTagName('head')[0];
		if (head) {
			var script = document.createElement('script');
			script.setAttribute('src', src);
			script.setAttribute('type', 'text/javascript');
			var ieVersion = function() {
				var rv = -1;
				if (navigator.appName == 'Microsoft Internet Explorer') {
					var ua = navigator.userAgent;
					var re = /MSIE ([0-9]{1,}[\g.0-9]{0,})/;
					if (re.exec(ua) !== null)
					rv = parseFloat(RegExp.$1);
				}
				return rv;
			}();
		
			if (typeof callback === 'function') {
				if ((ieVersion == -1) || (ieVersion > 8 && document.compatMode != 'BackCompat')) {
					script.onload = callback;
				} else {
					var loadFunction = function() {
						if (this.readyState == 'complete' || this.readyState == 'loaded') {
							callback();
						}
					};
					script.onreadystatechange = loadFunction;
				}
			}
			head.appendChild(script);
		}
	};
	return loadRemoteScript;
});
