jQuery(document).ready( function () {

    // Zoom mobile
    var eventsHandler;

    eventsHandler = {
        haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']
        , init: function(options) {
            var instance = options.instance
            , initialScale = 1
            , pannedX = 0
            , pannedY = 0

            // Init Hammer
            // Listen only for pointer and touch events
            this.hammer = Hammer(options.svgElement, {
            inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
            })

            // Enable pinch
            this.hammer.get('pinch').set({enable: true})

            // Handle double tap
            this.hammer.on('doubletap', function(ev){
            instance.zoomIn()
            })

            // Handle pan
            this.hammer.on('panstart panmove', function(ev){
            // On pan start reset panned variables
            if (ev.type === 'panstart') {
                pannedX = 0
                pannedY = 0
            }

            // Pan only the difference
            instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
            pannedX = ev.deltaX
            pannedY = ev.deltaY
            })

            // Handle pinch
            this.hammer.on('pinchstart pinchmove', function(ev){
            // On pinch start remember initial zoom
            if (ev.type === 'pinchstart') {
                initialScale = instance.getZoom()
                instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
            }

            instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
            })

            // Prevent moving the page on some devices when panning over SVG
            options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
        }

        , destroy: function(){
            this.hammer.destroy()
        }
    }

    jQuery(".search-supplier-input").val('');
    // Show maps
    jQuery(".show-fabrics").on('click touch', function() {
        jQuery("#map-min").hide();
        jQuery("#map-details").show();
        jQuery("#fabrics").show().addClass('svg-active');
        jQuery(".map-search").show();
        jQuery("#back").show();
        window.panZoom = svgPanZoom('#SVGFabrics', {
            zoomEnabled: true,
            controlIconsEnabled: true,
            zoomScaleSensitivity: 0.5,
            maxZoom: 15,
            center: 1,
            customEventsHandler: eventsHandler
        });

        // Search
        var qs = jQuery('input#searchSupplierFabrics').quicksearch('#SVGFabrics text', {
            'delay': 100,
            'minValLength': 3,
            'show': function () {
                this.style.fill = '#000';
            },
            'hide': function () {
                this.style.fill = '#000';
            },
            'onBefore': function() {
                jQuery("#live-search-Fabrics ul").empty();
                jQuery(".supplier-active").removeClass('supplier-active');
            },
            'onAfter': function () {
                //jQuery(".supplier-active").css('fill', 'red');
                //instance.setViewBox(36.5, 552.1, 1180, 1180);
                //instance.setCenter(36.5, 552.1)
                //instance.zoomIn([{x: 36.5,y: 552.1}, 1]);
            },
            'onValTooSmall': function (val) {
                console.log('value ' + val + ' is too small');
            },
            'prepareQuery': function (val) {
                return new RegExp(val, "i");
            },
            'testQuery': function (query, txt, _row) {
                if(query.test(txt) == true) {
                    /*console.log(txt)
                    console.log(query)*/
                    //console.log(_row.attributes['transform']['nodeValue'].substr())
                    var t = jQuery(_row).addClass('supplier-active').attr('transform').match(/[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/g);
                    jQuery("#live-search-Fabrics").show();
                    jQuery("#live-search-Fabrics ul").append('<li><button type="button" class="go-supplier" data-x="' + t[4] + '" data-y="' + t[5] + '">' + txt + '</button></li>');
                }
                return query.test(txt);
            },
            'onNoResultFound': function () {
                jQuery("#no-result").show();
            },
        });
    });

    jQuery(".show-accessories").on('click touch', function() {
        jQuery("#map-min").hide();
        jQuery("#map-details").show();
        jQuery("#accessories").show().addClass('svg-active');
        jQuery(".map-search").show();
        jQuery("#back").show();
        window.panZoom = svgPanZoom('#SVGAccessories', {
            zoomEnabled: true,
            controlIconsEnabled: true,
            zoomScaleSensitivity: 0.5,
            maxZoom: 15,
            center: 1,
            customEventsHandler: eventsHandler
        });

        // Search
        var qs = jQuery('input#searchSupplierAccessories').quicksearch('#SVGAccessories text', {
            'delay': 100,
            'minValLength': 3,
            'show': function () {
                this.style.fill = '#000';
            },
            'hide': function () {
                this.style.fill = '#000';
            },
            'onBefore': function() {
                jQuery("#live-search-Accessories ul").empty();
                jQuery(".supplier-active").removeClass('supplier-active');
            },
            'onAfter': function () {
                //jQuery(".supplier-active").css('fill', 'red');
                //instance.setViewBox(36.5, 552.1, 1180, 1180);
                //instance.setCenter(36.5, 552.1)
                //instance.zoomIn([{x: 36.5,y: 552.1}, 1]);
            },
            'onValTooSmall': function (val) {
                console.log('value ' + val + ' is too small');
            },
            'prepareQuery': function (val) {
                return new RegExp(val, "i");
            },
            'testQuery': function (query, txt, _row) {
                if(query.test(txt) == true) {
                    /*console.log(txt)
                    console.log(query)*/
                    //console.log(_row.attributes['transform']['nodeValue'].substr())
                    var t = jQuery(_row).addClass('supplier-active').attr('transform').match(/[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/g);
                    jQuery("#live-search-Accessories").show();
                    jQuery("#live-search-Accessories ul").append('<li><button type="button" class="go-supplier" data-x="' + t[4] + '" data-y="' + t[5] + '">' + txt + '</button></li>');
                }
                return query.test(txt);
            },
            'onNoResultFound': function () {
                jQuery("#no-result").show();
            },
        });
    });

    // Back button
    jQuery("#back").on('click touch', function() {
        jQuery(".search-supplier-input").val('');
        jQuery(".live-search").hide();
        jQuery("#map-min").show();
        jQuery("#map-details").hide();
        jQuery(".svg-container").hide().removeClass('svg-active');
        jQuery("#back").hide();
        panZoom.resetZoom()
    });

    jQuery(document).on('click', '.go-supplier', function() {
        var zoomInX = jQuery(this).data('x');
        var zoomInY = jQuery(this).data('y');
        //panZoom.center();
        panZoom.pan({x:0,y:0});
        var realZoom= panZoom.getSizes().realZoom;
        panZoom.pan
        ({  
            x: -(zoomInX*realZoom)+(panZoom.getSizes().width/2),
            y: -(zoomInY*realZoom)+(panZoom.getSizes().height/2)
        });

    });
});
