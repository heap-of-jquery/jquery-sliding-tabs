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
        	                var properties = {
	                                boxWidth:       parseInt($box.outerWidth(), 10) + 'px',
                	                boxHeight:      parseInt($box.outerHeight(), 10) + 'px',
                        	        boxLeft:        parseInt(bo.left, 10) + 'px',
	                                handleLeft:     parseInt(ho.left, 10) + 'px',
        	                        handleWidth:    parseInt($handle.outerWidth(), 10) + 'px',
                	                handleHeight:   parseInt($handle.outerHeight(), 10) + 'px'
                        	};

	                        $box.css(   { position: 'absolute', lineHeight:1 });
        	                $handle.css({ position: 'absolute', lineHeight:1 });

                	        if($lastHandle == null) {
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
        	                                bottom: '+' +  properties.boxHeight
                	                });
                        	};

	                        var slideOut = function() {
	                                $box.css("top", "auto");
        	                        $handle.css("top", "auto");
                	                $box.animate({
                        	                bottom: '-' + properties.boxHeight
                                	}, function() { $(this).hide(); });
	                                $handle.animate({
        			                bottom: 0
                                	});
	                        };

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

		destroy: function() { 
	
		}
	};
	
});
