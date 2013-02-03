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
	var methods = {
		create: function(options) {
				var defaults = {
					contents: '.contents', 	// the selector for the contents div.
					width: '250px',		// new: this is now fixed (the handle and the box get the same width)
					height: null,		// optional: force the heights to be the same (recommended)
					offset: 0,		// optional: this will offset from the bottom (side) by this size.
								// the reason you'd want to do this is to have something along the bottom (say a footer) that the tabs stick out of. make sure it's z-index is high!

					position: "bottom"	// bottom or top for now
					// TODO: add left/right with rotation.
					// TODO: add "only one open" option
					// TODO: add hover vs. click option
					// TODO: add click outside of region option
				}, settings = $.extend(defaults, options);

				var $lastHandle = null;
				jQuery(this).each(function() { 
	                	        var $handle = jQuery(this);	
        	                	var $box = $handle.next(settings.contents);
						
					var cssSize = {width: settings.width};
					if(settings.height !== null)
						cssSize.height = settings.height;
					$box.css(cssSize);
					var padding_offset = $handle.css("padding-left") + $handle.css("padding-right");

					$handle.css({
						width: $box.outerWidth() - padding_offset,
					});
	
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

					var spacing = 8;
					var locations = {
						bottom: {
							first: {
								anchor: ["left", "bottom"],
								position: ["left", "bottom+" + settings.offset]
							},
							handles: {
								anchor: ["left", "bottom"],
								position: ["right+" + spacing, "top"]
							},
							box: {
								anchor: ["left", "top"],
								position: ["left", "bottom"]
							}
						},
	
						top: {
							first: {
								anchor: ["left", "top"],
								position: ["left", "top+" + settings.offset]
							},
							handles: {
								anchor: ["left", "top"],
								position: ["right+" + spacing, "bottom"]
							},
							box: {
								anchor: ["left", "bottom"],
								position: ["left", "top"]
							}	
						}
					};

	
					var position = locations[settings.position];
					if($lastHandle === null) {
						// TODO: check if we have to do the join for .position.
						$handle.position({
							my: position.first.anchor.join(" "),
							at: position.first.position.join(" "), 
							of: "body"
						});
						$lastBox = $box;
						$lastHandle = $handle;
					} else {
						$handle.position({
							my: position.handles.anchor.join(" "),
							at: position.handles.position.join(" "),
							of: $lastBox
						});
						$lastBox = $box;
						$lastHandle = $handle;
					}

					$box.position({
						my:     position.box.anchor.join(" "),
						at:     position.box.position.join(" "),
						of:     $handle
					});


					// TODO: slide in/out needs to consider what mode we're in
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

	        	                var slideOut = function(hideFirst) {
						if(typeof hideFirst != "undefined") {
							$box.hide();
						}

	                	                $box.css("top", "auto");
        	                	        $handle.css("top", "auto");
	                	                $box.animate({
        	                	                bottom: '-' + sizes.boxHeight
                	                	}, function() { $(this).hide(); });
	                	                $handle.animate({
        				                bottom: 0
                                		});
		                        };
					
					$handle.data("jquery-sliding-tabs", {
						settings: settings, 
						box: $box, 
						slide:{
							inbound: slideIn, outbound:slideOut
						}
					});

        		                slideOut.call($box, true);
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
			jqst.slide.inbound();
		},

		closed: function() {
			var jqst = $(this).data("jquery-sliding-tabs");
			jqst.slide.outbound();
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
