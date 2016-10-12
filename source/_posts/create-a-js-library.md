---
title: 如何使用javascript创造一个类库
date: 2016-10-09 17:05:36
categories: [javascript]
tags: 编程
---
以jQuery为例：
``` javascript
( function( global, factory ) {
	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var jQuery = function(){
  // jQuery func
};

window.jQuery = jQuery;

return jQuery;
} );
```
立即执行函数避免了全局环境的污染，像函数传入2个参数分别是<code>global</code>和<code>factory</code>，对应了<code>typeof window !== "undefined" ? window : this</code> 和 <code>function( window, noGlobal){ ... return jQuery; }</code>这两个参数。

window传入之前会检查其是否存在，之后兼容AMD/CMD两种导入方式。
