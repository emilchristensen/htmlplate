/*
 * Vertic JS utility library - Core
 * http://labs.vertic.com
 *
 * Copyright 2012, Vertic A/S
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Date: Tue Jan 31 12:00:00 2012 +0200
 */
(function(jQuery){
  // Set up object
  var vertic = new Object();
  
  // Hook in to 3rd party libs
  var $ = typeof jQuery !== 'undefined' ? jQuery : typeof window.jQuery !== 'undefined' ? window.jQuery : false;
  
  // Utilities
  vertic.utils = new Object();
    // Logging
    var _Log = function(obj){
      // Set defaults
      this.history = [];
      this.debug = false;
      this.domConsole = false;
      this.meta = true;
      this.name = 'Vertic Log';
      
      // Update settings
      if (typeof obj === 'object') {
        if (typeof obj.debug === 'boolean') this.debug = obj.debug;
        if (typeof obj.name === 'string') this.name = obj.name;
        if (typeof obj.meta === 'boolean') this.meta = obj.meta;
        if (obj.domConsole) {    
          this.domConsole = true;
        }
      }
      // Check for jQuery to allow domConsole
      if ($) { // Require jQuery because I'm lazy
        this.canDoDomConsole = true;
      }
      return this;
    };
    _Log.prototype.write = function(arg,forceDebug){
      var orgArg = arg;
      
      // Add metadata
      arg = this.addMeta(arg);
      
      // Push object to internal log
      this.history.push(arg); 
      
      // Try native console, but fail silently
      try { console.log(arg) } catch(err) { } 
      
      // Make loud debugging noises
      if (this.debug || typeof forceDebug !== 'undefined') { alert('Log: ' + orgArg) } 
      
      // Call to very basic DOM based console for browsers with no native console
      this.callDomConsole(arg);
      
      // Return base argument
      return orgArg;
    };
    _Log.prototype.setupDomConsole = function(){
      if (this.canDoDomConsole) {
        this.domConsoleElems = {
          container: $('<ol class="vertic-log" title="'+this.name+'" style="line-height:15px; max-height:100px; overflow:auto; background:#fffbd6; padding:10px; clear:both; margin:0; border-bottom:1px solid #ccc; position:relative; list-style:decimal; z-index:9999;"></ul>').prependTo('body'),
          item: $('<li style="line-height:15px; color:#000; font-size:12px; margin-left:2em; font-family:Monaco, \'Bitstream Vera Sans Mono\', \'Lucida Console\', Terminal, monospace"></li>')
        };
      }
    };
    _Log.prototype.callDomConsole = function(arg){
      if (this.domConsole === true && this.canDoDomConsole === true) { 
        if (typeof this.domConsoleElems !== 'object') this.setupDomConsole();
        this.domConsoleElems.container.append(this.domConsoleElems.item.clone().text(this.meta ? arg.datetime + ' - ' + arg.type + ' : ' + arg.string : arg));
      }
    };
    _Log.prototype.addMeta = function(arg){
      return this.meta ? { arg: arg, datetime: (function(){ return new Date().getTime()})(), log: this.name, string: arg.toString(), type: typeof arg } : arg ;
    };
    vertic.utils.log = _Log;
    
    // Error handling - inherits from log
    var _Error = function(){
    };
    _Error.prototype = new _Log();
    _Error.prototype.parent = _Log.prototype;
    _Error.prototype.write = function(arg,status,msg,die){
      var orgArg = arg;
      
      // Set optional parameters
      if (typeof status === 'undefined') status = 'unknown';
      if (typeof msg === 'undefined') msg = '';
      if (typeof die !== 'boolean') die = false;
      
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
        try { console.warn(status+': '+msg); console.warn(arg); } catch(err) {}
      }
      
      // Make loud debugging noises
      if (this.debug || typeof forceDebug !== 'undefined') { alert('Error: ' + orgArg) } 
      
      // Call to very basic DOM based console for browsers with no native console
      this.callDomConsole(arg);
      
      // TODO: Service call?
      
      // Return base argument
      return orgArg;
    };
    vertic.utils.error = _Error;
    
    // Remote script loading
    var loadRemoteScript = function(src,callback) {
      var head = document.getElementsByTagName('head')[0];
      if (head){    
        var script = document.createElement('script');
        script.setAttribute('src',src);
        script.setAttribute('type','text/javascript');
        var ieVersion = function(){
          var rv=-1;
          if (navigator.appName=='Microsoft Internet Explorer') {
            var ua=navigator.userAgent;
            var re=new RegExp("MSIE ([0-9]{1,}[\g.0-9]{0,})");
            if(re.exec(ua)!==null)
              rv=parseFloat(RegExp.$1);
          }
          return rv;
        }();
        
        if ((ieVersion==-1) || (ieVersion>8 && document.compatMode != 'BackCompat')) {
          script.onload = callback;
        } else {
          var loadFunction = function(){
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
              callback(); 
            }
          };
          script.onreadystatechange = loadFunction;
        }
        head.appendChild(script);
      }
    };
    vertic.utils.loadRemoteScript = loadRemoteScript;
  
  // Internal instances and shortcuts
  vertic.internal = new Object();
  vertic.internal.log = new _Log();
  vertic.internal.error = new _Error();
  vertic.log = function(){ return vertic.internal.log.write.apply(vertic.internal.log,arguments); };
  vertic.err = function(){ return vertic.internal.error.write.apply(vertic.internal.error,arguments); };
  
  // Expose libraryt
  window._v = vertic;
})();