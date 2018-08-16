// JavaScript Document
(function ($, window) {

    var berrygood = {};

    berrygood.properties = {
        windowWidth: '',
        isMobile: false
    };

    berrygood.utils = {

        // checks based on CSS class
        mobileCheck: function() {
            var rtnVal = false;
            if($('html').hasClass('mobile')){
                rtnVal = true;
            }
            return rtnVal;
        }
    };

    berrygood.environment = {

        resize: function(){
        },

        init: function (){
            // check for mobile
            if (berrygood.utils.mobileCheck()){
                berrygood.properties.isMobile = true;
            }
        }
    };

    berrygood.navigation = {

        // main navigation
        $mobileNav: $('nav#menu'),
        $mobileNavCloseButton: $('.close-mobile-navigation-link'),
        API: undefined,

        resize: function(){
            berrygood.navigation.API.close();
        },

        init: function(){

            if (typeof HasTouch != 'undefined') {
                if(!HasTouch){
                    $('.hover-on-desktop-only').addClass('has-hover').removeClass('hover-on-desktop-only');
                }
            }

            berrygood.navigation.$mobileNav.mmenu({
                "offCanvas": {
                    "position": "right"
                }
            });

            berrygood.navigation.API = berrygood.navigation.$mobileNav.data("mmenu");
            berrygood.navigation.$mobileNavCloseButton.on('click',function() {
                berrygood.navigation.API.close();
            });
        }
    };

    berrygood.carousel = {
        $html: $('.main-carousel'),
        $controls: $('.carousel-controls', this.$html),
        $slides: $('.carousel-slide', this.$html),
        $textBoxes: $('.text', this.$html),
        auto: true,
        delay: 7, // 7 seconds,
        timer: undefined,
        currentIndex: 0,

        changeScreen: function(index){

            // sets and un-sets necessary elements of a slide
            $('a', berrygood.carousel.$controls).removeClass('active').eq(index).addClass('active');
            berrygood.carousel.$slides.removeClass('active').eq(index).addClass('active');
            berrygood.carousel.$textBoxes.removeClass('active').eq(index).addClass('active');
        },

        init: function(){

            // initiates click to change slides
            if(berrygood.carousel.$html.length > 0){
                $('a', berrygood.carousel.$controls).on('click', function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    if(!$(this).hasClass('active')){
                        var index = $('a', berrygood.carousel.$controls).index(this);
                        berrygood.carousel.changeScreen(index);
                        clearInterval(berrygood.carousel.timer);
                    }
                });
            }

            // makes image click-able, without complex z-index CSS
            if($('.click-able', berrygood.carousel.$html).length > 0){

                // stops More links clashing with click-able images
                berrygood.carousel.$html.find('.text a').on('click', function (evt) {
                    evt.stopPropagation();
                });

                // adds click event on the entire carousel, a bit messy, sorry
                // looks for href of link in active text
                berrygood.carousel.$html.on('click', function () {
                    location.assign($('.text.active',$(this)).find('.slide-cta').attr('href'));
                });
            }

            // sets up auto if true
            if(berrygood.carousel.auto){
                berrygood.carousel.timer = setInterval(function () {
                    if(!berrygood.carousel.$html.is(':hover')){
                        berrygood.carousel.currentIndex++;
                        if(berrygood.carousel.currentIndex > (berrygood.carousel.$slides.length - 1)){
                            berrygood.carousel.currentIndex = 0;
                        }
                        berrygood.carousel.changeScreen(berrygood.carousel.currentIndex);
                    }
                }, berrygood.carousel.delay * 1000);
            }
        }
    };


    berrygood.init = function () {

        // all init here
        berrygood.environment.init();
        berrygood.navigation.init();
        berrygood.carousel.init();

        // resize triggers
        $(window).on('resize', function () {

            var newWidth = $(window).width(),
                oldWidth = berrygood.properties.windowWidth;

            if (oldWidth != newWidth) {
                berrygood.properties.windowWidth = newWidth;
                berrygood.resize();
            }
        });

        // trigger initial resize, just to be sure
        berrygood.resize();
        $(window).trigger('resize');
    };

    // main resize
    berrygood.resize = function () {
        berrygood.environment.resize();
        berrygood.navigation.resize();
        berrygood.customise.resize();
    };

    // main init
    $(document).ready(function () {
        //berrygood.init();
        $('.owl-carousel').owlCarousel({
            items:1,
            margin:10,
            autoHeight:true,
            nav: true,
            loop: true
        });
        $(window).scroll(function (event) {
            //berrygood.scrollEvents();
        });
    });

}(jQuery, window));