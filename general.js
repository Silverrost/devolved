var Webflow = Webflow || [];
Webflow.push(function() {
	var drpdwns = document.querySelectorAll(".w-dropdown");
    for (var i = 0; i < drpdwns.length; i++) {
        var drpdwn = drpdwns[i]
        if (drpdwn.querySelectorAll(".w-dropdown-list .w--current").length > 0) {
            drpdwn.classList.add("w--current");
	    }
    }
});
