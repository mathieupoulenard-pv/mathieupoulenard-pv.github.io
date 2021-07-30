jQuery(document).ready( function () {

    //Show popin
    setTimeout( function(){
        jQuery(".modal").addClass('show').slideDown();
    }, 500);

    jQuery("#closeModal").on(
        'click', function() {
            jQuery(".modal").removeClass('show').slideUp();
            jQuery(".help").fadeIn();
        }
    );

    jQuery("#openHelpModal").on(
        'click', function() {
            jQuery(".modal").addClass('show').slideDown();
            jQuery(".help").fadeOut();
        }
    );

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

    //Init live search
    jQuery("input#searchSupplierFabrics").quicksearch('#SVGFabrics text', {
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
                var t = jQuery(_row).addClass('supplier-active').attr('transform').match(/[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/g);
                var bboxResult = jQuery(_row)[0].getBBox();
                jQuery("#live-search-Fabrics").show().addClass('active');
                jQuery("#live-search-Fabrics ul").append('<li><button type="button" class="go-supplier" data-width="' + bboxResult.width + '" data-height="' + bboxResult.height + '" data-x="' + t[4] + '" data-y="' + t[5] + '">' + txt + '</button></li>');
            }
            return query.test(txt);
        },
        'onNoResultFound': function () {
            jQuery("#live-search-Fabrics ul").append('<li>Aucun résultat</li>');
        },
    });

    jQuery("input#searchSupplierAccessories").quicksearch('#SVGAccessories text', {
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
                var t = jQuery(_row).addClass('supplier-active').attr('transform').match(/[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/g);
                var bboxResult = jQuery(_row)[0].getBBox();
                jQuery("#live-search-Accessories").show().addClass('active');
                jQuery("#live-search-Accessories ul").append('<li><button type="button" class="go-supplier" data-width="' + bboxResult.width + '" data-height="' + bboxResult.height + '" data-x="' + t[4] + '" data-y="' + t[5] + '">' + txt + '</button></li>');
            }
            return query.test(txt);
        },
        'onNoResultFound': function () {
            jQuery("#live-search-Accessories ul").append('<li>Aucun résultat</li>');
        },
    });

    jQuery("input#searchSupplierLeather").quicksearch('#SVGLeather text', {
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
                var t = jQuery(_row).addClass('supplier-active').attr('transform').match(/[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/g);
                var bboxResult = jQuery(_row)[0].getBBox();
                jQuery("#live-search-Leather").show().addClass('active');
                jQuery("#live-search-Leather ul").append('<li><button type="button" class="go-supplier" data-width="' + bboxResult.width + '" data-height="' + bboxResult.height + '" data-x="' + t[4] + '" data-y="' + t[5] + '">' + txt + '</button></li>');
            }
            return query.test(txt);
        },
        'onNoResultFound': function () {
            jQuery("#live-search-Leather ul").append('<li>Aucun résultat</li>');
        },
    });

    // Show maps
    jQuery(".show-fabrics").on('click touch', function() {
        showmaps("#fabrics", "#SVGFabrics");
    });

    jQuery(".show-accessories").on('click touch', function() {
        showmaps("#accessories", "#SVGAccessories");
    });

    jQuery(".show-leather").on('click touch', function() {
        showmaps("#leather", "#SVGLeather");
    });

    // Nav hall buttons
    jQuery(".nav-hall__btn").on(
        'click', function() {
            var map = jQuery(this).data("map");
            var svgmap = jQuery(this).data("svgmap");
            jQuery(".svg-active").hide();

            showmaps(map, svgmap);
        }
    );

    // Back button
    jQuery("#back").on('click touch', function() {
        jQuery(".search-supplier-input").val('');
        jQuery(".live-search").hide().removeClass('active').children('ul').empty();
        jQuery("#map-min").show();
        jQuery("#map-details").hide();
        jQuery("#hallNav").hide();
        jQuery(".svg-container").hide().removeClass('svg-active');
        jQuery("#back").hide();
        panZoom.resetZoom();
    });

    jQuery(document).on('click', '.go-supplier', function() {
        var zoomInX = jQuery(this).data('x');
        var zoomInY = jQuery(this).data('y');
        var zoomInWidth = jQuery(this).data('width');
        var zoomInHeight = jQuery(this).data('height');

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
        jQuery(".live-search.active").prev().children('input').val(jQuery(this).text());
        jQuery(".live-search.active").hide();

        panZoom.setOnZoom(function(level){
            if(level < 11 && level > 2) {
                jQuery(".svg-active").find(".ico-poi").attr('width', 50);
                jQuery(".svg-active").find(".ico-poi").attr('height', 85);
                jQuery(".svg-active").find(".ico-poi").attr({'x': zoomInX - 20, 'y': zoomInY - 95});
            } else if(level < 2) {
                jQuery(".svg-active").find(".ico-poi").attr('width', 100);
                jQuery(".svg-active").find(".ico-poi").attr('height', 169);
                jQuery(".svg-active").find(".ico-poi").attr({'x': zoomInX - 40, 'y': zoomInY - 169});
            } else {
                jQuery(".svg-active").find(".ico-poi").attr('width', 20);
                jQuery(".svg-active").find(".ico-poi").attr('height', 34);
                jQuery(".svg-active").find(".ico-poi").attr({'x': zoomInX, 'y': zoomInY - 40});
            }
        });

    });

    function showmaps(map, svgMap) {
        jQuery("#map-min").hide();
        jQuery("#map-details").show();
        var maxzoom = 15;
        if(map == "#fabrics") {
            jQuery("#nextHall").hide();
            jQuery("#prevHall").data({'map': '#accessories', 'svgmap': '#SVGAccessories', 'input': 'input#searchSupplierAccessories', 'livesearch': '#live-search-Accessories'}).show().children().text('Accessories');
            maxzoom = 30;
        } else if(map == "#accessories") {
            jQuery("#prevHall").show().data({'map': '#leather', 'svgmap': '#SVGLeather', 'input': 'input#searchSupplierLeather', 'livesearch': '#live-search-Leather'}).children().text('Leather');
            jQuery("#nextHall").show().data({'map': '#fabrics', 'svgmap': '#SVGFabrics', 'input': 'input#searchSupplierFabrics', 'livesearch': '#live-search-Fabrics'}).children().text('Fabrics');
        } else {
            jQuery("#prevHall").hide();
            jQuery("#nextHall").show().data({'map': '#accessories', 'svgmap': '#SVGAccessories', 'input': 'input#searchSupplierAccessories', 'livesearch': '#live-search-Accessories'}).children().text('Accessories');
        }
        jQuery("#hallNav").show();
        jQuery(map).show().addClass('svg-active');
        jQuery(".map-search").show();
        jQuery("#back").show();

        window.panZoom = svgPanZoom(svgMap, {
            zoomEnabled: true,
            controlIconsEnabled: true,
            zoomScaleSensitivity: 0.5,
            maxZoom: maxzoom,
            center: 1,
            customEventsHandler: eventsHandler
        });
    }
});

function zoomReset(panZoomInstance) {
    panZoomInstance.fit();
    panZoomInstance.center();
    panZoomInstance.zoom(1);
}

function searchSupplier(input, svgMap, livesearch) {
    window.qs = jQuery(input).quicksearch(svgMap + ' text', {
        'delay': 100,
        'minValLength': 3,
        'show': function () {
            this.style.fill = '#000';
        },
        'hide': function () {
            this.style.fill = '#000';
        },
        'onBefore': function() {
            jQuery(livesearch + " ul").empty();
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
                jQuery(livesearch).show().addClass('active');
                jQuery(livesearch + " ul").append('<li><button type="button" class="go-supplier" data-width="' + bboxResult.width + '" data-height="' + bboxResult.height + '" data-x="' + t[4] + '" data-y="' + t[5] + '">' + txt + '</button></li>');
            }
            return query.test(txt);
        },
        'onNoResultFound': function () {
            jQuery(livesearch + " ul").append('<li>Aucun résultat</li>');
        },
    });
}