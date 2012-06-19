/*
 * Vertic JS utility library - Services
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Tue Jan 31 12:00:00 2012 +0200
 */
define(['libs/jquery', 'tools/log', 'tools/error', 'tools/JSON'], function($, _Log, _Error) {
	// Set up service utilities
	var log = new _Log(),
	error = new _Error(),
	services = {
		request: function(url, data, win, lose) {
			if (typeof data !== 'object') {
				data = {};
			}
			if (typeof win === 'undefined') {
				win = function(resp) {
					log.write(resp);
				};
			}
			if (typeof lose === 'undefined') {
				lose = function(resp, jqxhr) {
					error.write(resp, 'Service error', jqxhr.responseText);
				};
			}
			$.ajax({
				url: url,
				data: JSON.stringify(data),
				dataType: 'json',
				type: 'post',
				complete:function(jqxhr, ts){
					if (ts === "success") {
						var resp = jqxhr.responseText;
						if (resp) {
							resp = JSON.parse(resp);
							if (resp.Outcome.Success === true || allowErr) {
								win(resp,jqxhr);
							} else {
								lose(resp,jqxhr);
							}
						} else {
							error.write(jqxhr, 'Response format error', resp);
						}
					} else {
						error.write(jqxhr, 'Ajax request error', ts);
					}
				}
			});
		}
	};
	
	return services;
});