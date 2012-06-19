/*
 * Vertic JS utility library - Core
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Tue Jan 31 12:00:00 2012 +0200
 */

define(['libs/jquery', 'tools/log', 'tools/error', 'tools/load-remote-script'], function($, _Log, _Error, loadRemoteScript){
	var core = {};
	core.log = new _Log();
	core.error = new _Error();
	core.loadRemoteScript = loadRemoteScript;
	
	return core;
});