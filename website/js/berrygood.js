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
            berrygood.navigation.$mobileNavCloseButton.on('click', function() {
                berrygood.navigation.API.close();
            });
        }
    };

    berrygood.carousel = {
        init: function(){
            $('.owl-carousel').owlCarousel({
                items:1,
                margin:10,
                autoHeight:true,
                nav: true,
                loop: true
            });
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
    };

    // main init
    $(document).ready(function () {
        berrygood.init();
        $(window).scroll(function (event) {
            //berrygood.scrollEvents();
        });
    });

}(jQuery, window));