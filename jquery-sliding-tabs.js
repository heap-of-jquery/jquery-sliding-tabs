/*
License - you must retain this notice in ALL redistributions

Copyright 2013 Giuseppe Burtini      https://github.com/gburtini

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this library except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
   
*/

(function($) {
	var $lastHandle = null;
	var methods = {
		create: function(options) {
				var defaults = {
					contents: '.contents', 	// the selector for the contents div.
					width: '250px',		// new: this is now fixed (the handle and the box get the same width)
					height: null,		// optional: force the heights to be the same (recommended)
					// TODO: add left/right/bottom/top stuff.
					// TODO: add "only one open" option
					// TODO: add hover vs. click option
				}, settings = $.extend(defaults, options);

                	        var $handle = jQuery(this);	// TODO: what if you pass in multiple handles, should each over these.
                        	var $box = $handle.next(settings.contents);
					
				var cssSize = {width: settings.width};
				if(settings.height !== null)
					cssSize.height = settings.height;
				$box.css(cssSize);
				$handle.css(cssSize);

                	        var bo = $box.offset();
                        	var ho = $handle.offset();
        	                var sizes = {
	                                boxWidth:       parseInt($box.outerWidth(), 10) + 'px',
                	                boxHeight:      parseInt($box.outerHeight(), 10) + 'px',
                        	        boxLeft:        parseInt(bo.left, 10) + 'px',
	                                handleLeft:     parseInt(ho.left, 10) + 'px',
        	                        handleWidth:    parseInt($handle.outerWidth(), 10) + 'px',
                	                handleHeight:   parseInt($handle.outerHeight(), 10) + 'px'
                        	};

	                        $box.css(    { position: 'absolute' } );
        	                $handle.css( { position: 'absolute' } );

                	        if($lastHandle === null) {
                        	        $handle.position({
	                                        my: "left bottom",
        	                                at: "left bottom",
                	                        of: "body"
                        	        });
                                	$lastBox = $box;
	                                $lastHandle = $handle;
        	                } else {
                	                $handle.position({
                        	                my: "left bottom",
                                	        at: "right+8 top",
                                        	of: $lastBox
	                                });
        	                        $lastBox = $box;
                	                $lastHandle = $handle;
                        	}

	                        $box.position({
        	                        my:     "left top",
                	                at:     "left bottom",
                        	        of:     $handle
	                        });

        	                var slideIn = function() {
                	                $box.css("top", "auto");
	                                $handle.css("top", "auto");

        	                        $box.show();
                	                $box.animate({
                        	                bottom: '0'
                                	});
	                                $handle.animate({
        	                                bottom: '+' +  sizes.boxHeight
                	                });
                        	};

	                        var slideOut = function() {
	                                $box.css("top", "auto");
        	                        $handle.css("top", "auto");
                	                $box.animate({
                        	                bottom: '-' + sizes.boxHeight
                                	}, function() { $(this).hide(); });
	                                $handle.animate({
        			                bottom: 0
                                	});
	                        };
				
				$handle.data("jquery-sliding-tabs", {settings: settings, box: $box, slide:{in: slideIn, out:slideOut}});

        	                slideOut($box);
                	        $handle.click(function(e) {
                        	        e.preventDefault();
                                	if($box.hasClass("open")) {
                                        	$box.removeClass("open");
	                                        slideOut();
        	                        } else {
                	                        $box.addClass("open");
                        	                slideIn();
                                	}
	                        });
        	        });
		},

		open: function() {
			var jqst = $(this).data("jquery-sliding-tabs");
			jqst.slide.in();
		},

		closed: function() {
			var jqst = $(this).data("jquery-sliding-tabs");
			jqst.slide.out();
		},

		destroy: function() { 
			var jqst = $(this).data("jquery-sliding-tabs");
			jqst.box.remove();
			$(selector).remove();
		}
	};


	$.fn.slidingTabs = function(method) {		
	    	if ( methods[method] ) {
      			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    	} else if ( typeof method === 'object' || ! method ) {
      			return methods.create.apply( this, arguments );
	    	} else {
      			$.error( 'Method ' +  method + ' does not exist on jQuery.slidingTabs' );
	    	}    
  
		return this;
	}
	
})(jQuery);
