var Webflow = Webflow || [];
Webflow.push(function() {
	var splide = new Splide( '.splide', {
        type     : 'loop',
        focus    : 1,
        autoplay: true,
        drag   : 'free',
        snap   : true,
        arrows: false,
        pagination: false,
        speed: 700,
        interval: 3000,
        mediaQuery: 'min',
        gap: 30,
        perPage: 5,
        perMove: 1,
        breakpoints: {
            1440: {perPage:5,},
            992: {perPage: 4,},
            768: {perPage: 3,},
            480: {perPage: 2,},
            320: {perPage: 1,},
        }
    });
    splide.mount();
});