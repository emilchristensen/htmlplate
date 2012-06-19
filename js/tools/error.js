/*
 * Vertic JS utility library - Error inherits from Log
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Tue Jan 31 12:00:00 2012 +0200
 */
define(['libs/jquery', 'tools/log'], function($, _Log) {
	var _Error = function(){};
	_Error.prototype = new _Log();
	_Error.prototype.parent = _Log.prototype;
	_Error.prototype.write = function(arg,status,msg,die){
		var orgArg = arg;
		
		// Set optional parameters
		if (typeof status === 'undefined') {
			status = 'unknown';
		}
		if (typeof msg === 'undefined') {
			msg = '';
		}
		if (typeof die !== 'boolean') {
			die = false;
		}
		
		// Add metadata
		arg = this.addMeta(arg);
		if (this.meta) {
			arg.error = true;
			arg.errorType = status.toString();
			arg.errorMsg = msg.toString();
		}
		
		// Push object to internal log
		this.history.push(arg); 
		
		// Throw JS error if needed or simple warning if possible
		if (die) {
			throw new Error(status+': '+msg);
		} else {
			try { console.warn(status+': '+msg, arg); } catch(err) {}
		}
		
		// Make loud debugging noises
		if (this.debug || typeof forceDebug !== 'undefined') {
			alert('Error: ' + orgArg);
		}
		
		// Call to very basic DOM based console for browsers with no native console
		this.callDomConsole(arg);
		
		// TODO: Service call?
		
		// Return base argument
		return orgArg;
	};
	
	return _Error;
});
