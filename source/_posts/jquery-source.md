---
title: 分析jQuery源码
date: 2016-09-27 14:18:19
categories: [javascript]
tags: 编程
---
jq由grunt这个构建工具构建，我们可以通过package.json文件查看构建jquery需要使用到的一些modules。还可以通过查看Gruntfile.js了解jquery这个项目的具体构建方案和调试方案。但这个不是重点。我们下面来看看项目中src下的core.js关于jQuery变量的定义：
``` javascript
// Define a local copy of jQuery
jQuery = function( selector, context ) {

  // The jQuery object is actually just the init constructor 'enhanced'
  // Need init if jQuery is called (just allow error to be thrown if not included)
  return new jQuery.fn.init( selector, context );
}
```

这里jQuery这个方法 new了jq原型上的init这个类并传入selector和context两个参数。init这个类的定义如下：
``` javascript
init = jQuery.fn.init = function( selector, context, root ) {
  var match, elem;

  // HANDLE: $(""), $(null), $(undefined), $(false)
  if ( !selector ) {
    return this;
  }

  // Method init() accepts an alternate rootjQuery
  // so migrate can support jQuery.sub (gh-2101)
  root = root || rootjQuery;

  // Handle HTML strings
  if ( typeof selector === "string" ) {
    if ( selector[ 0 ] === "<" &&
      selector[ selector.length - 1 ] === ">" &&
      selector.length >= 3 ) {

      // Assume that strings that start and end with <> are HTML and skip the regex check
      match = [ null, selector, null ];

    } else {
      match = rquickExpr.exec( selector );
    }

    // Match html or make sure no context is specified for #id
    if ( match && ( match[ 1 ] || !context ) ) {

      // HANDLE: $(html) -> $(array)
      if ( match[ 1 ] ) {
        context = context instanceof jQuery ? context[ 0 ] : context;

        // Option to run scripts is true for back-compat
        // Intentionally let the error be thrown if parseHTML is not present
        jQuery.merge( this, jQuery.parseHTML(
          match[ 1 ],
          context && context.nodeType ? context.ownerDocument || context : document,
          true
        ) );

        // HANDLE: $(html, props)
        if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
          for ( match in context ) {

            // Properties of context are called as methods if possible
            if ( jQuery.isFunction( this[ match ] ) ) {
              this[ match ]( context[ match ] );

            // ...and otherwise set as attributes
            } else {
              this.attr( match, context[ match ] );
            }
          }
        }

        return this;

      // HANDLE: $(#id)
      } else {
        elem = document.getElementById( match[ 2 ] );

        if ( elem ) {

          // Inject the element directly into the jQuery object
          this[ 0 ] = elem;
          this.length = 1;
        }
        return this;
      }

    // HANDLE: $(expr, $(...))
    } else if ( !context || context.jquery ) {
      return ( context || root ).find( selector );

    // HANDLE: $(expr, context)
    // (which is just equivalent to: $(context).find(expr)
    } else {
      return this.constructor( context ).find( selector );
    }

  // HANDLE: $(DOMElement)
  } else if ( selector.nodeType ) {
    this[ 0 ] = selector;
    this.length = 1;
    return this;

  // HANDLE: $(function)
  // Shortcut for document ready
  } else if ( jQuery.isFunction( selector ) ) {
    return root.ready !== undefined ?
      root.ready( selector ) :

      // Execute immediately if ready is not present
      selector( jQuery );
  }

  return jQuery.makeArray( selector, this );
};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

define( [
  // required things
], function( jQuery ) {

"use strict";

return ( window.jQuery = window.$ = jQuery );

} );
```
此方法主要通过select、context、root这三个参数来查找用户想找到的DOM元素，并把它或它们放入0这个属性之中。例如$("#jq")则会对应到代码之中的：
``` javascript
// HANDLE: $(#id)
} else {
  elem = document.getElementById( match[ 2 ] );

  if ( elem ) {

    // Inject the element directly into the jQuery object
    this[ 0 ] = elem;
    this.length = 1;
  }
  return this;
}
```
来处理，命中其他条件，则对应其他的处理方式，源码中都有相应注释。


重点是最后一句:<b>init.prototype = jQuery.fn;</b>，init这个类的原型赋值成了jQuery这个类的原型，那么现在init也将拥有jQuery原型上的方法和属性。最后将window上的jQuery和$赋值成jQuery这个变量。

当我们调用$(arguments)去匹配某一个或多个DOM时， 实际上jq创建给我们一个init类的对象，并执行了init这个构造方法并根据参数返回了包含所匹配的DOM的一个init对象，这个init类的原型本身又是jQuery这个类的原型，当我们拥有init这个类的对象的时候，同时也可以访问jQuery原型链上的方法和属性了。

那当我们调用$(arguments).attr(argument) 的时候，这个attr方法是在哪里定义的呢？我们从上述分析之中可以知道 $(arguments) 实际上是返回了一个init对象，而这个对象是可以访问jQuery这个类的原型链上的属性和方法的。jQuery则使用了extend 和 fn.extend来分别拓展 jq的公共方法和jq的原型上的方法(供$(arguments)返回的对象来调用)。extend方法源码如下：

``` javascript
jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};
```
这里jQuery.extend 和 jQuery.fn.extend都赋值成了相同的方法，在调用 $.extend(argument) 和 $.extend(argument) 的时候，方法内this指向是不同的，前者会直接指向jQuery这个类，后者却执行jQuery.fn(即jQuery.prototype)。

 而这个方法，简单的理解就是遍历传入的对象的属性名name,属性值value，并赋值this[name] = value， 这里的value往往是个方法。

 所以当我们事先定义$.extend({a: 1}); 内部实际上执行了$[a] = 1 而已。当我们访问$的‘a’这个属性时，会返回1这个值。所以我们在使用jQuery的时候也经常会用extend这个方式来预先定义一些处理方法，以供之后的使用。

 以上则是jQuery这个框架的主要设计方法，当然jQuery的一些具体的DOM处理方式也是值得我们去探索和学习的。
