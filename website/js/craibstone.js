// JavaScript Document
(function ($, window) {

    var craibstone = {};

    craibstone.properties = {
        windowWidth: '',
        isMobile: false
    };

    craibstone.utils = {

        // checks based on CSS class
        mobileCheck: function() {
            var rtnVal = false;
            if($('html').hasClass('mobile')){
                rtnVal = true;
            }
            return rtnVal;
        }
    };

    craibstone.environment = {

        resize: function(){
        },

        init: function (){
            // check for mobile
            if (craibstone.utils.mobileCheck()){
                craibstone.properties.isMobile = true;
            }
        }
    };

    craibstone.navigation = {

        // main navigation
        $mobileNav: $('nav#menu'),
        $mobileNavCloseButton: $('.close-mobile-navigation-link'),
        API: undefined,

        resize: function(){
            craibstone.navigation.API.close();
        },

        init: function(){

            if (typeof HasTouch != 'undefined') {
                if(!HasTouch){
                    $('.hover-on-desktop-only').addClass('has-hover').removeClass('hover-on-desktop-only');
                }
            }

            craibstone.navigation.$mobileNav.mmenu({
                "offCanvas": {
                    "position": "right"
                }
            });

            craibstone.navigation.API = craibstone.navigation.$mobileNav.data("mmenu");
            craibstone.navigation.$mobileNavCloseButton.on('click',function() {
                craibstone.navigation.API.close();
            });
        }
    };

    craibstone.calendar = {

        $els: $('.calendar'),
        dateClicked: function(id){
            var $dateTd = $("#" + id);
            // console.log("Date: " + $dateTd.data("date") + ", Event: " + $dateTd.data("hasEvent"));
            if(!$dateTd.data("hasEvent")){
                // set some value to be posted in form
                //
                //
                $dateTd.toggleClass('selected');
            }
        },

        thisMonth: {
            weekstartson: 0,
            show_previous: false,
            show_next: false,
            today: true,
            action: function () {
                return craibstone.calendar.dateClicked(this.id, false);
            }
        },

        nextMonth: {
            weekstartson: 0,
            show_previous: false,
            show_next: false,
            action: function () {
                return craibstone.calendar.dateClicked(this.id, false);
            }
        },

        init: function(){
            if(craibstone.calendar.$els.length > 0){
                // retrieve data for this month
                if (typeof dataThisMonth != 'undefined') {
                    craibstone.calendar.thisMonth.data = dataThisMonth.selection;
                    craibstone.calendar.thisMonth.year = dataThisMonth.date.year;
                    craibstone.calendar.thisMonth.month = dataThisMonth.date.month;
                }
                $("#thisMonth").zabuto_calendar(craibstone.calendar.thisMonth);

                // retrieve data for next month
                if (typeof dataNextMonth != 'undefined') {
                    craibstone.calendar.nextMonth.data = dataNextMonth.selection;
                    craibstone.calendar.nextMonth.year = dataNextMonth.date.year;
                    craibstone.calendar.nextMonth.month = dataNextMonth.date.month;
                }
                $("#nextMonth").zabuto_calendar(craibstone.calendar.nextMonth);
            }

            if($('.timeOfDay').length > 0){

            }

            if($('.timeSlots').length > 0){
                $('.timeSlots').find('a').on('click', function(evt){
                    evt.preventDefault();
                    if(!$(this).hasClass("event")){
                        $(this).toggleClass('selected');
                    }
                });
            }
        }
    };

    craibstone.thumbs = {
        $html: $('.main-and-thumbs'),

        init: function(){
            craibstone.thumbs.$html.each(function(i, obj){
                var $main = $('.main', $(obj)),
                    $thumbs = $('.image', $(obj)).find('a');

                $thumbs.each(function(i, thumb){
                    $(thumb).on('click', function(evt){
                        evt.preventDefault();
                        $thumbs.removeClass('active');
                        $(this).addClass('active');

                        $main.attr('href', $(this).attr('data-large-url'));
                        $('img', $main).attr('src', $(this).attr('data-main-url'));
                    });
                });
            });
        }
    };

    craibstone.magnificOverlays = {
        init: function(){

            var $movieLinks = $('.magnific-video');
            if($movieLinks.length > 0) {
                $movieLinks.each(function(){
                    $(this).magnificPopup({
                        type: 'iframe'
                    });
                });
            }

            var $imageLinks = $('.magnific-image');
            if($imageLinks.length > 0) {
                $imageLinks.each(function(){
                    $(this).magnificPopup({
                        type: 'image'
                    });
                });
            }

            var $imageGallery = $('.magnific-gallery');
            if($imageGallery.length > 0 ){
                $imageGallery.each(function (i, obj) {
                    $('a', $(obj)).magnificPopup({
                        //delegate: 'a',
                        type: 'image',
                        tLoading: 'Loading image #%curr%...',
                        mainClass: 'mfp-img-mobile',
                        gallery: {
                            enabled: true,
                            navigateByImgClick: true,
                            preload: [0,1], // Will preload 0 - before current, and 1 after the current image
                            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
                            tPrev: 'Previous', // title for left button
                            tNext: 'Next', // title for right button
                            tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
                        },
                        image: {
                            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                            titleSrc: function(item) {
                                return item.el.attr('title');
                            }
                        },
                        callbacks: {
                            markupParse: function(template, values, item) {
                                // Triggers each time when content of popup changes
                                //console.log($($("a[href='"+item.src+"']").eq(0)));

                            }
                        }
                    });
                });

            }
        }
    };

    craibstone.carousel = {
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
            $('a', craibstone.carousel.$controls).removeClass('active').eq(index).addClass('active');
            craibstone.carousel.$slides.removeClass('active').eq(index).addClass('active');
            craibstone.carousel.$textBoxes.removeClass('active').eq(index).addClass('active');
        },

        init: function(){

            // initiates click to change slides
            if(craibstone.carousel.$html.length > 0){
                $('a', craibstone.carousel.$controls).on('click', function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    if(!$(this).hasClass('active')){
                        var index = $('a', craibstone.carousel.$controls).index(this);
                        craibstone.carousel.changeScreen(index);
                        clearInterval(craibstone.carousel.timer);
                    }
                });
            }

            // makes image click-able, without complex z-index CSS
            if($('.click-able', craibstone.carousel.$html).length > 0){

                // stops More links clashing with click-able images
                craibstone.carousel.$html.find('.text a').on('click', function (evt) {
                    evt.stopPropagation();
                });

                // adds click event on the entire carousel, a bit messy, sorry
                // looks for href of link in active text
                craibstone.carousel.$html.on('click', function () {
                    location.assign($('.text.active',$(this)).find('.slide-cta').attr('href'));
                });
            }

            // sets up auto if true
            if(craibstone.carousel.auto){
                craibstone.carousel.timer = setInterval(function () {
                    if(!craibstone.carousel.$html.is(':hover')){
                        craibstone.carousel.currentIndex++;
                        if(craibstone.carousel.currentIndex > (craibstone.carousel.$slides.length - 1)){
                            craibstone.carousel.currentIndex = 0;
                        }
                        craibstone.carousel.changeScreen(craibstone.carousel.currentIndex);
                    }
                }, craibstone.carousel.delay * 1000);
            }
        }
    };

    craibstone.infoLinks = {
        $html: $('.info-link'),
        scrolling: function(){
           $('.closer', craibstone.infoLinks.$html).trigger('click');
        },
        init: function(){
            craibstone.infoLinks.$html.each(function(i, obj){
                $('.opener', $(obj)).on('click', function(evt){
                    evt.preventDefault();
                    $(obj).addClass('opened');
                });
                $('.closer', $(obj)).on('click', function(evt){
                    evt.preventDefault();
                    $(obj).removeClass('opened');
                });
            });
        }
    };

    craibstone.selections = {
        $html: $('.time-selection'),
        init: function () {
            if(craibstone.selections.$html.length > 0){
                var $slots = $('td', craibstone.selections.$html);
                $slots.each(function (i, obj) {
                    $(obj).on('click', function () {
                        if(!$(this).hasClass('event')){
                            // set some value to be posted in form
                            //
                            //
                            $(this).toggleClass('selected');
                        }
                    });
                });
            }
        }
    };

    craibstone.customise = {
        $form: $('#customise-form'),
        $addButtons: $('.action input', this.$form),
        $table: $('.customise-table', this.$html),
        datePicker: undefined,

        init: function(){
            if(craibstone.customise.$form.length > 0){
                craibstone.customise.$addButtons.each(function(i, obj){
                    $(obj).on('change', function(){
                        if($(this).is(':checked')){
                            // checks for exclusive, eg breakfast and lunch
                            if ($(this).data('exclusive') !== undefined){
                                var group = $(this).data('exclusive');
                                $("input[name="+group+"]").not(this).prop('checked', false).trigger('change');
                            }

                            // code for adding to cart here
                            //
                            //


                            // changes pod display
                            $(this).parents('.addable-item').addClass('added');

                            // shows corresponding row in table
                            craibstone.customise.$table.find('.'+$(this).attr('id')).removeClass('display-none').addClass('included');

                            // adjusts zebra stripping on table
                            $(".included", craibstone.customise.$table).each(function (index) {
                                $(this).toggleClass("stripe", !!(index & 1));
                            });

                        } else {

                            // code remove from table/cart
                            //
                            //

                            $(this).parents('.addable-item').removeClass('added');
                            craibstone.customise.$table.find('.'+$(this).attr('id')).addClass('display-none').removeClass('included');
                            $(".included", craibstone.customise.$table).each(function (index) {
                                $(this).toggleClass("stripe", !!(index & 1));
                            });
                        }
                    });
                });
            }

            if($('#date').length > 0){
                // date selection - see https://github.com/dbushell/Pikaday for more features
                var today = new Date(),
                    threeMonthsFromToday = new Date(new Date(today).setMonth(today.getMonth()+3)); // or week or whatever

                craibstone.customise.datePicker = new Pikaday({
                    field: document.getElementById('date'),
                    format: 'D MMM YYYY',
                    minDate: today,
                    maxDate: threeMonthsFromToday,
                    theme: 'craibstone',
                    showDaysInNextAndPreviousMonths: true,
                    onSelect: function() {
                        $('.table-date').text(this.getMoment().format('Do MMMM YYYY'));
                    }
                });
            }

            // group/size selection
            $('.your-group').on('change', function(){
                $('.table-group').text($(this).val());
            });

            // group/size selection
            $('.your-rounds').on('change', function(){
                $('.table-rounds').text($(this).val());
            });
        },

        resize: function(){
            if(craibstone.customise.datePicker !== undefined) {
                craibstone.customise.datePicker.adjustPosition();
            }
        }
    };

    craibstone.scrollEvents = function(){
        craibstone.infoLinks.scrolling();
    };

    craibstone.init = function () {

        // all init here
        craibstone.environment.init();
        craibstone.navigation.init();
        craibstone.carousel.init();
        craibstone.thumbs.init();
        craibstone.calendar.init();
        craibstone.infoLinks.init();
        craibstone.selections.init();
        craibstone.customise.init();
        craibstone.magnificOverlays.init();

        // resize triggers
        $(window).on('resize', function () {

            var newWidth = $(window).width(),
                oldWidth = craibstone.properties.windowWidth;

            if (oldWidth != newWidth) {
                craibstone.properties.windowWidth = newWidth;
                craibstone.resize();
            }
        });

        // trigger initial resize, just to be sure
        craibstone.resize();
        $(window).trigger('resize');
    };

    // main resize
    craibstone.resize = function () {
        craibstone.environment.resize();
        craibstone.navigation.resize();
        craibstone.customise.resize();
    };

    // main init
    $(document).ready(function () {
        craibstone.init();
        $(window).scroll(function (event) {
            craibstone.scrollEvents();
        });
    });

}(jQuery, window));