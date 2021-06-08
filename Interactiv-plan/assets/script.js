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

    // Input search
    jQuery(".search-supplier-input").val('');
    jQuery(".search-supplier-input").on('input', function() {
        if(!this.value) {
            jQuery(this).parent().siblings('.live-search').hide();
        }
    });

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
                //console.log('value ' + val + ' is too small');
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
                    var bboxResult = jQuery(_row)[0].getBBox();
                    jQuery("#live-search-Fabrics").show().addClass('active');
                    jQuery("#live-search-Fabrics ul").append('<li><button type="button" class="go-supplier" data-width="' + bboxResult.width + '" data-height="' + bboxResult.height + '" data-x="' + t[4] + '" data-y="' + t[5] + '">' + txt + '</button></li>');
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
                //console.log('value ' + val + ' is too small');
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
                    var bboxResult = jQuery(_row)[0].getBBox();
                    jQuery("#live-search-Accessories").show().addClass('active');
                    jQuery("#live-search-Accessories ul").append('<li><button type="button" class="go-supplier" data-width="' + bboxResult.width + '" data-height="' + bboxResult.height + '" data-x="' + t[4] + '" data-y="' + t[5] + '">' + txt + '</button></li>');
                }
                return query.test(txt);
            },
            'onNoResultFound': function () {
                jQuery("#no-result").show();
            },
        });
    });

    jQuery(".show-leather").on('click touch', function() {
        jQuery("#map-min").hide();
        jQuery("#map-details").show();
        jQuery("#leather").show().addClass('svg-active');
        jQuery(".map-search").show();
        jQuery("#back").show();
        window.panZoom = svgPanZoom('#SVGLeather', {
            zoomEnabled: true,
            controlIconsEnabled: true,
            zoomScaleSensitivity: 0.5,
            maxZoom: 15,
            center: 1,
            customEventsHandler: eventsHandler
        });

        // Search
        var qs = jQuery('input#searchSupplierLeather').quicksearch('#SVGLeather text', {
            'delay': 100,
            'minValLength': 3,
            'show': function () {
                this.style.fill = '#000';
            },
            'hide': function () {
                this.style.fill = '#000';
            },
            'onBefore': function() {
                jQuery("#live-search-Leather ul").empty();
                jQuery(".supplier-active").removeClass('supplier-active');
            },
            'onAfter': function () {
                //jQuery(".supplier-active").css('fill', 'red');
                //instance.setViewBox(36.5, 552.1, 1180, 1180);
                //instance.setCenter(36.5, 552.1)
                //instance.zoomIn([{x: 36.5,y: 552.1}, 1]);
            },
            'onValTooSmall': function (val) {
                //console.log('value ' + val + ' is too small');
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
                    var bboxResult = jQuery(_row)[0].getBBox();
                    jQuery("#live-search-Leather").show().addClass('active');
                    jQuery("#live-search-Leather ul").append('<li><button type="button" class="go-supplier" data-width="' + bboxResult.width + '" data-height="' + bboxResult.height + '" data-x="' + t[4] + '" data-y="' + t[5] + '">' + txt + '</button></li>');
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
        jQuery(".live-search").hide().removeClass('active').children('ul').empty();
        jQuery("#map-min").show();
        jQuery("#map-details").hide();
        jQuery(".svg-container").hide().removeClass('svg-active');
        jQuery("#back").hide();
        panZoom.resetZoom()
    });

    jQuery(document).on('click', '.go-supplier', function() {
        /*jQuery('<path class="ico-poi" d="M50.9,28.7c-13,0-23.6,10.6-23.6,23.6C27.3,65.3,37.9,76,50.9,76c13,0,23.7-10.6,23.7-23.7'+
        'C74.6,39.3,64,28.7,50.9,28.7z M50.9,6.4C26.3,6.4,6.4,26.4,6.4,51c0,7.2,1.7,14.1,5,20.4c0,0.1,0.1,0.1,0.1,0.2l0.6,1.1L50.9,145'+
        'l39.6-73.6c3.3-6.5,5-13.3,5-20.5C95.5,26.4,75.5,6.4,50.9,6.4z M50.9,81.4c-16,0-29.1-13.1-29.1-29.1c0-16,13-29,29.1-29'+
        'c16,0,29.1,13,29.1,29C80,68.3,66.9,81.4,50.9,81.4z M50.9,1c-27.6,0-50,22.4-50,50c0,8.1,1.9,15.8,5.5,22.6'+
        'c0.1,0.2,0.1,0.4,0.2,0.5l41.9,77.9c0.5,0.9,1.4,1.4,2.4,1.4c1,0,1.9-0.6,2.4-1.4l41.2-76.6l0.8-1.6c3.7-7.2,5.6-14.9,5.6-22.9'+
        'C100.9,23.4,78.5,1,50.9,1z M90.5,71.4L50.9,145L12.1,72.7l-0.6-1.1c0-0.1-0.1-0.2-0.1-0.2C8,65,6.4,58.2,6.4,51'+
        'c0-24.6,20-44.6,44.6-44.6c24.6,0,44.6,20,44.6,44.6C95.5,58.1,93.8,65,90.5,71.4z M50.9,23.2c-16,0-29.1,13-29.1,29'+
        'c0,16,13,29.1,29.1,29.1c16,0,29.1-13.1,29.1-29.1C80,36.3,66.9,23.2,50.9,23.2z M50.9,76c-13,0-23.6-10.6-23.6-23.7'+
        'c0-13,10.6-23.6,23.6-23.6c13,0,23.7,10.6,23.7,23.6C74.6,65.3,64,76,50.9,76z"/>').insertAfter(jQuery('.supplier-active'));*/
        var zoomInX = jQuery(this).data('x');
        var zoomInY = jQuery(this).data('y');
        var zoomInWidth = jQuery(this).data('width');
        var zoomInHeight = jQuery(this).data('height');
        //panZoom.center();
        /*panZoom.pan({x:0,y:0});
        var realZoom= panZoom.getSizes().realZoom;
        panZoom.pan
        ({
            x: -(zoomInX*realZoom)+(panZoom.getSizes().width/2),
            y: -(zoomInY*realZoom)+(panZoom.getSizes().height/2)
        });*/

        zoomReset(panZoom);
        var vbb=panZoom.getSizes().viewBox;
        var x=vbb.width/2-zoomInX-zoomInWidth/2;
        var y=vbb.height/2-zoomInY-zoomInHeight/2;
        var rz=panZoom.getSizes().realZoom;
        var zoom=vbb.width/zoomInWidth;
        panZoom.pan
        ({
            x: -(zoomInX*rz)+(panZoom.getSizes().width/2),
            y: -(zoomInY*rz)+(panZoom.getSizes().height/2)
        });
        panZoom.zoom(zoom);

        jQuery(".svg-active").find(".ico-poi").attr({'x': zoomInX, 'y': zoomInY - 40}).show();
        jQuery(".live-search.active").prev().prev().children('input').val(jQuery(this).text());
        jQuery(".live-search.active").hide();

    });
});

function zoomReset(panZoomInstance) {
    panZoomInstance.fit();
    panZoomInstance.center();
    panZoomInstance.zoom(1);
}