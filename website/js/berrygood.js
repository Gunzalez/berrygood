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

    berrygood.recipeFilter = {

        $controls: $('#filter-controls'),
        $filtered: $('#filtered'),
        $mobileTrigger: $('#filter-controls-mobile'),
        init: function(){

            this.$controls.on('click', 'span', function(){

                var $filterTag = $(this);
                var tag = $filterTag.attr('data-filter-tag');
                var items = $('#filtered').find("[data-tags]");
                var $emptyList = $('#empty-list');
                
                $emptyList.removeClass('is-empty');

                if(!$filterTag.hasClass('active')){
                    $filterTag.parent().find('.active').removeClass('active');
                    for (var i = 0; i < items.length; i++) {
                        var $item = $(items[i]);
                        $item.addClass('filtered-out');
                        if ($item.attr('data-tags').split(" ").indexOf(tag) > -1 || tag === "") {
                            $item.removeClass('filtered-out');
                        }
                    }
                    $filterTag.addClass('active');
                }

                if(!$('#filtered').find("[data-tags]").not('.filtered-out').length){
                    $emptyList.addClass('is-empty');
                }
                
            });

            var that = this;
            this.$mobileTrigger.on('click', function(){
                that.$controls.toggleClass('on-for-mobile');
            });
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

    // for all non hero carousel
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

    berrygood.heroCarousel = {

        $carousel: $('#hero-carousel'),

        init: function(){
            var dots = this.$carousel.find('.dots span');
            var slides = this.$carousel.find('.slide');

            if(this.$carousel.length){
                setInterval(() => {

                    // current index
                    var count = slides.length;
                    var index = slides.index($('.active'));
                    index++;
                    if(index === count){
                        index = 0;
                    }
                    slides.removeClass('active');
                    slides.eq(index).addClass('active');

                    dots.removeClass('active');
                    dots.eq(index).addClass('active');

                }, 7000);
            }
        }

    };

    berrygood.init = function () {

        // all init here
        berrygood.environment.init();
        berrygood.navigation.init();
        berrygood.carousel.init();
        berrygood.recipeFilter.init();
        berrygood.heroCarousel.init();

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