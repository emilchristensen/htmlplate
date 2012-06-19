/*
 * Vertic JS utility library - Log
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Tue Jun 19, 2012 12:00:00 GMT +0200
 */
define(['libs/jquery'], function($) {
	var _Log = function(obj) {
		// Set defaults
		this.history = [];
		this.debug = false;
		this.domConsole = false;
		this.meta = true;
		this.name = 'Vertic Log';
		
		// Update settings
		if (typeof obj === 'object') {
			if (typeof obj.debug === 'boolean') {
				this.debug = obj.debug;
			}
			if (typeof obj.name === 'string') {
				this.name = obj.name;
			}
			if (typeof obj.meta === 'boolean') {
				this.meta = obj.meta;
			}
			if (obj.domConsole) {
				this.domConsole = true;
			}
		}
		// Check for jQuery to allow domConsole
		if ($) {
			// Require jQuery because I'm lazy
			this.canDoDomConsole = true;
		}
		return this;
	};
	_Log.prototype.write = function(arg, forceDebug) {
		var orgArg = arg;
		
		// Add metadata
		arg = this.addMeta(arg);
		
		// Push object to internal log
		this.history.push(arg);
		
		// Try native console, but fail silently
		try {
			console.log(orgArg, arg);
		} catch(err) {}
		
		// Make loud debugging noises
		if (this.debug || typeof forceDebug !== 'undefined') {
			alert('Log: ' + orgArg);
		}
		
		// Call to very basic DOM based console for browsers with no native console
		this.callDomConsole(arg);
		
		// Return base argument
		return orgArg;
	};
	_Log.prototype.setupDomConsole = function() {
		if (this.canDoDomConsole) {
			this.domConsoleElems = {
				container: $('<ol class="vertic-log" title="' + this.name + '" style="line-height:15px; max-height:100px; overflow:auto; background:#fffbd6; padding:10px; clear:both; margin:0; border-bottom:1px solid #ccc; position:relative; list-style:decimal; z-index:9999;"></ul>').prependTo('body'),
				item: $('<li style="line-height:15px; color:#000; font-size:12px; margin-left:2em; font-family:Monaco, \'Bitstream Vera Sans Mono\', \'Lucida Console\', Terminal, monospace"></li>')
			};
		}
	};
	_Log.prototype.callDomConsole = function(arg) {
		if (this.domConsole === true && this.canDoDomConsole === true) {
			if (typeof this.domConsoleElems !== 'object') this.setupDomConsole();
			this.domConsoleElems.container.append(this.domConsoleElems.item.clone().text(this.meta ? arg.datetime + ' - ' + arg.type + ' : ' + arg.string: arg));
		}
	};
	_Log.prototype.addMeta = function(arg) {
		return this.meta ? {
			arg: arg,
			datetime: (function() {
				return new Date().getTime();
			})(),
			log: this.name,
			string: arg.toString(),
			type: typeof arg
		}: arg;
	};
	
	return _Log;
});