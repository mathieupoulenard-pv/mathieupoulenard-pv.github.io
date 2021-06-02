jQuery(document).ready( function () {


    window.zoomFabrics = svgPanZoom('#demoSVG', {
        zoomEnabled: true,
        controlIconsEnabled: true,
        fit: true,
        center: true,
        // viewportSelector: document.getElementById('demo-tiger').querySelector('#g4') // this option will make library to misbehave. Viewport should have no transform attribute
      });

      document.getElementById('enable').addEventListener('click', function() {
        window.zoomFabrics.enableControlIcons();
      })
      document.getElementById('disable').addEventListener('click', function() {
        window.zoomFabrics.disableControlIcons();
      })

    jQuery(".show-fabrics").on('click touch', function() {
        jQuery("#map-min").hide();
        jQuery("#map-details").show();
        jQuery("#back").show();
    });
    jQuery("#back").on('click touch', function() {
        jQuery("#searchSupplier").val('');
        jQuery("#live-search").hide();
        jQuery("#map-min").show();
        jQuery("#map-details").hide();
        jQuery("#back").hide();
    });

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

    jQuery(document).on('click', '.go-supplier', function() {
        console.log('click')
        var zoomInX = jQuery(this).data('x');
        var zoomInY = jQuery(this).data('y');
        console.log(zoomInX)
        console.log(zoomInY)
    });
});

// Zoom