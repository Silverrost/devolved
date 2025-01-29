document.addEventListener( 'DOMContentLoaded', function() {
	var elms = document.getElementsByClassName( 'splide' );

	for ( var i = 0; i < elms.length; i++ ) {
		new Splide( elms[ i ], {
			type     : 'loop',
			focus    : 0,
			autoplay: false,
			drag   : 'free',
			snap   : true,
			arrows: true,
			pagination: false,
			speed: 700,
			interval: 3000,
			mediaQuery: 'min',
			perPage: 2,
			perMove: 1,
			breakpoints: {
				1440: {perPage: 3,gap: 36,},
				992: {perPage: 2,gap: 30,},
				320: {perPage: 1,},
			}
		}).mount();
	}
});