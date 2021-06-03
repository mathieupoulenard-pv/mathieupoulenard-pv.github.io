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

    jQuery("#searchSupplier").val('');
    // Show maps
    jQuery(".show-fabrics").on('click touch', function() {
        jQuery("#map-min").hide();
        jQuery("#map-details").show();
        jQuery("#back").show();
        window.panZoom = svgPanZoom('#demoSVG', {
            zoomEnabled: true,
            controlIconsEnabled: true,
            zoomScaleSensitivity: 0.5,
            maxZoom: 15,
            fit: 1,
            center: 1,
            customEventsHandler: eventsHandler
        });
    });

    // Back button
    jQuery("#back").on('click touch', function() {
        jQuery("#searchSupplier").val('');
        jQuery("#live-search").hide();
        jQuery("#map-min").show();
        jQuery("#map-details").hide();
        jQuery("#back").hide();
    });

    // Search
    // Search
    var qs = jQuery('input#searchSupplier').quicksearch('#demoSVG text', {
        'delay': 100,
        'minValLength': 3,
        /*'show': function () {
            this.classList.add("supplier-active");
        },
        'hide': function () {
            this.style.color = '#ccc';
        },*/
        'onBefore': function() {
            jQuery("#live-search ul").empty();
        },
        'onAfter': function () {
            //jQuery(".supplier-active").css('fill', 'red');
            //instance.setViewBox(36.5, 552.1, 1180, 1180);
            //instance.setCenter(36.5, 552.1)
            //instance.zoomIn([{x: 36.5,y: 552.1}, 1]);
        },
        'prepareQuery': function (val) {
            return new RegExp(val, "i");
        },
        'testQuery': function (query, txt, _row) {
            if(query.test(txt) == true) {
                /*console.log(txt)
                console.log(query)*/
                //console.log(_row.attributes['transform']['nodeValue'].substr())
                var t = jQuery(_row).attr('transform').match(/[+-]?([1-9]\d*(\.\d*[1-9])?|0\.\d*[1-9]+)|\d+(\.\d*[1-9])?/g);
                jQuery("#live-search").show();
                jQuery("#live-search ul").append('<li><button type="button" class="go-supplier" data-x="' + t[4] + '" data-y="' + t[5] + '">' + txt + '</button></li>');
            }
            return query.test(txt);
        },
        'onNoResultFound': function () {
            jQuery("#no-result").show();
        },
    });
});
