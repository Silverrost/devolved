var Webflow = Webflow || [];
Webflow.push(function() {
	var drpdwns = document.querySelectorAll(".w-dropdown");
    for (var i = 0; i < drpdwns.length; i++) {
        var drpdwn = drpdwns[i]
        if (drpdwn.querySelectorAll(".w-dropdown-list .w--current").length > 0) {
            drpdwn.classList.add("w--current");
	    }
    }
    var oldW = jQuery(window).width();
  
    // resizing:
	$(window).on('resize', function () {
		if (window.resFin) clearTimeout(window.resFin);
    // resize end:
		window.resFin = setTimeout(function(){
			var newW = jQuery(window).width();
			// W changed:
			if(oldW!==newW){	
        // false to get page from cache
				this.location.reload(false); 
			}
		}, 500);
	});
});
