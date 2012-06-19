/*
 * Vertic JS - Site functional wrapper
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 *
 * Date: Tue Jan 31 12:00:00 2012 +0200
 * Modified: Tue Jun 19 16:00:00 2012 +0200
 */

require(['libs/jquery', 'tools/core', 'tools/services'], function($, core, services) {
	// DOM ready
	$(function() {
		core.log.write('DOM is ready!');
		core.error.write(core,'Core dump','Reactor overheating',false);
		
		// expose core to global scope as vertic
		window.vertic = core;
	});
	
});
