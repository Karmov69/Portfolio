'use strict';

var button_log = document.querySelector('.welcome__login');

if(button_log) {
button_log.onclick = function(e) {
    let flipper = document.querySelector('.flipper');
    let button  = document.querySelector('.welcome__login');
    let main    = document.querySelector('.main_page'); 
    flipper.classList.add("flip-active");
    button.style.display = 'none';
    main.onclick = function(e) {
        flipper.classList.remove("flip-active");
        button.style.display = 'block';
    };
};
};



// PARALLAX 1


var parallaxContainer = document.getElementById('parallax');

	if(parallaxContainer) {
	var  layers = parallaxContainer.children;


// Функция, которая отслеживает позицию курсора и производит сдвиг картинок
var moveLayers = function (e) {
	var initialX = (window.innerWidth / 2) - e.pageX,
		initialY = (window.innerHeight / 2) - e.pageY;

	[].slice.call(layers).forEach(function (layer, i) {
		var divider = i / 100,
			positionX = initialX * divider,
			positionY = initialY * divider,
			bottomPosition = (window.innerHeight / 2) * divider,
			layerStyle = layer.style,
			transformString = 'translate3d(' + positionX + 'px ,' + positionY + 'px , 0)';

		layerStyle.transform = transformString;
		layerStyle.bottom = '-' + bottomPosition + 'px';
	});
};

window.addEventListener('mousemove', moveLayers);
}
//PARALLAX 1  end ----------------------------------------------------------------------




// PARALLAX 2 scroll

var parallax = (function () {
	var bg   		= document.querySelector('.hero__bg');
	var user 		= document.querySelector('.hero__user-block');
	

	return {
		move: function (block, windowScroll, strafeAmount) {
			var strafe = windowScroll / -strafeAmount + '%';
			var transformString = 'translate3d(0,' + strafe + ',0)';
			var style  = block.style;
			style.transform = transformString;
			style.webkitTransform = transformString;
		},

		init: function (wScroll) {
			this.move(bg, wScroll, 45);
			this.move(user, wScroll, 15);
		}
	}

}());

window.onscroll = function () {
	var wScroll = window.pageYOffset;
	parallax.init(wScroll);
};


//PARALLAX 2 scroll end ----------------------------------------------------------------------


// Preloader

var preloader = (function(){
    var percentsTotal = 0,
        preloader = $('.preloader');

    var imgPath = $('*').map(function(ndx, element){
        var background = $(element).css('background-image'),
            img = $(element).is('img'),
            path = '';


        if(background != 'none') {
            path = background.replace('url("', '').replace('")', '');
        }


        if(img) {
            path = $(element).attr('src');
        }

        if(path) return path
    });


    var setPercent = function(total, current) {
        var percents = Math.ceil(current / total * 100);

        $('.preloader__percents').text(percents + '%');

        if(percents >= 100) {
            preloader.fadeOut();
        }
    }

    var loadImages = function (images) {
        if(!images.length) preloader.fadeOut();

        images.forEach(function(img, i, images) {
           var fakeImage = $('<img>', {
               attr : {
                   src: img
               }
           });


            fakeImage.on('load error', function(){
            percentsTotal++;
                setPercent(images.length, percentsTotal);
            });
        });
    }


    return {
        init: function () {
            var imgs = imgPath.toArray();
            loadImages(imgs);
        }
    }
}());


$(function () {
    preloader.init();
});

//preloader end ------------------------------------------------------------------------------------------------

// map ------------------------------------------------------------------------------------------------------------
 var map = document.querySelector('.map');
 if (map) {
   google.maps.event.addDomListener(window, 'load', init);
    var map, markersArray = [];

    function bindInfoWindow(marker, map, location) {
        google.maps.event.addListener(marker, 'click', function() {
            function close(location) {
                location.ib.close();
                location.infoWindowVisible = false;
                location.ib = null;
            }

            if (location.infoWindowVisible === true) {
                close(location);
            } else {
                markersArray.forEach(function(loc, index){
                    if (loc.ib && loc.ib !== null) {
                        close(loc);
                    }
                });

                var boxText = document.createElement('div');
                boxText.style.cssText = 'background: #fff;';
                boxText.classList.add('md-whiteframe-2dp');

                function buildPieces(location, el, part, icon) {
                    if (location[part] === '') {
                        return '';
                    } else if (location.iw[part]) {
                        switch(el){
                            case 'photo':
                                if (location.photo){
                                    return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
                                 } else {
                                    return '';
                                }
                                break;
                            case 'iw-toolbar':
                                return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
                                break;
                            case 'div':
                                switch(part){
                                    case 'email':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
                                        break;
                                    case 'web':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
                                        break;
                                    case 'desc':
                                        return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
                                        break;
                                    default:
                                        return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
                                    break;
                                }
                                break;
                            case 'open_hours':
                                var items = '';
                                if (location.open_hours.length > 0){
                                    for (var i = 0; i < location.open_hours.length; ++i) {
                                        if (i !== 0){
                                            items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours +'</strong></li>';
                                        }
                                        var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours +'</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
                                    }
                                    return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
                                 } else {
                                    return '';
                                }
                                break;
                         }
                    } else {
                        return '';
                    }
                }

                boxText.innerHTML = 
                    buildPieces(location, 'photo', 'photo', '') +
                    buildPieces(location, 'iw-toolbar', 'title', '') +
                    buildPieces(location, 'div', 'address', 'location_on') +
                    buildPieces(location, 'div', 'web', 'public') +
                    buildPieces(location, 'div', 'email', 'email') +
                    buildPieces(location, 'div', 'tel', 'phone') +
                    buildPieces(location, 'div', 'int_tel', 'phone') +
                    buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
                    buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

                var myOptions = {
                    alignBottom: true,
                    content: boxText,
                    disableAutoPan: true,
                    maxWidth: 0,
                    pixelOffset: new google.maps.Size(-140, -40),
                    zIndex: null,
                    boxStyle: {
                        opacity: 1,
                        width: '280px'
                    },
                    closeBoxMargin: '0px 0px 0px 0px',
                    infoBoxClearance: new google.maps.Size(1, 1),
                    isHidden: false,
                    pane: 'floatPane',
                    enableEventPropagation: false
                };

                location.ib = new InfoBox(myOptions);
                location.ib.open(map, marker);
                location.infoWindowVisible = true;
            }
        });
    }

    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(59.985593660922305,30.352076437255846),
            zoom: 13,
            gestureHandling: 'auto',
            fullscreenControl: false,
            zoomControl: true,
            disableDoubleClickZoom: false,
            mapTypeControl: false,
            scaleControl: false,
            scrollwheel: false,
            streetViewControl: false,
            draggable : true,
            clickableIcons: false,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{"featureType":"water","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"landscape","stylers":[{"color":"#f2f2f2"}]},{"featureType":"road","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]}]
        }
        var mapElement = document.getElementById('mapkit-9650');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
            {"title":"Парголовская ул., 11","address":"","desc":"","tel":"","int_tel":"","email":"","web":"","web_formatted":"","open":"","time":"","lat":59.9861654,"lng":30.345376999999985,"vicinity":"Санкт-Петербург","open_hours":"","marker":{"fillColor":"#0288D1","fillOpacity":1,"strokeWeight":0,"scale":1.5,"path":"M10.2,7.4c-6,0-10.9,4.9-10.9,10.9c0,6,10.9,18.4,10.9,18.4s10.9-12.3,10.9-18.4C21.2,12.2,16.3,7.4,10.2,7.4z M10.2,22.9c-2.6,0-4.6-2.1-4.6-4.6s2.1-4.6,4.6-4.6s4.6,2.1,4.6,4.6S12.8,22.9,10.2,22.9z","anchor":{"x":10,"y":30},"origin":{"x":0,"y":0},"style":1},"iw":{"address":true,"desc":true,"email":true,"enable":true,"int_tel":true,"open":true,"open_hours":true,"photo":true,"tel":true,"title":true,"web":true}}
        ];
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                icon: locations[i].marker,
                position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
                map: map,
                title: locations[i].title,
                address: locations[i].address,
                desc: locations[i].desc,
                tel: locations[i].tel,
                int_tel: locations[i].int_tel,
                vicinity: locations[i].vicinity,
                open: locations[i].open,
                open_hours: locations[i].open_hours,
                photo: locations[i].photo,
                time: locations[i].time,
                email: locations[i].email,
                web: locations[i].web,
                iw: locations[i].iw
            });
            markersArray.push(marker);

            if (locations[i].iw.enable === true){
                bindInfoWindow(marker, map, locations[i]);
            }
        }
        var arrays = [];
        while (locations.length > 0) {
            arrays.push(locations.splice(0, 5));
        }
        for (var i = 0; i < arrays.length; i++) {
            makeRoutes(arrays[i]);
        }
        function makeRoutes(locations) {
            var waypts = [];
            var directionsService = new google.maps.DirectionsService();
            var directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                preserveViewport: true
            });
            if (locations.length > 1){
                for (var i = 0; i < locations.length; i++) {
                    waypts.push({
                        location:new google.maps.LatLng(locations[i].lat, locations[i].lng),
                        stopover:true
                    }); 
                }; 
            };
            var request = {
                origin: new google.maps.LatLng(locations[0].lat, locations[0].lng),
                destination: new google.maps.LatLng(locations[locations.length - 1].lat, locations[locations.length - 1].lng),
                waypoints: waypts,
                optimizeWaypoints: true,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    polylineOptions = {
                        strokeColor: '#808080',
                        strokeWeight: '1'
                    }
                    directionsDisplay.setOptions({
                        polylineOptions: polylineOptions
                    });
                    directionsDisplay.setDirections(response);
                }
            });
            directionsDisplay.setMap(map);
        }
   
    }
}
//map end ----------------------------------------------------------------------------------------------------------------


//hamburger ------------------------------------------------------------------------------------------


var hamb = document.querySelector('.input-toggler');

if(hamb) {
var Hamburger = (function () {
  var   body = $('body'),
        hamburger = $('.menu-toggler');

  return {
    init: function () {
      hamburger.on('click', function (e) {
        body.toggleClass('body_active');
      });
    }
  }
}());

$(function () {
  if (Hamburger) {
    Hamburger.init();
  }
});

};






//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGJ1dHRvbl9sb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VsY29tZV9fbG9naW4nKTtcblxuaWYoYnV0dG9uX2xvZykge1xuYnV0dG9uX2xvZy5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGxldCBmbGlwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKTtcbiAgICBsZXQgYnV0dG9uICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWxjb21lX19sb2dpbicpO1xuICAgIGxldCBtYWluICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5fcGFnZScpOyBcbiAgICBmbGlwcGVyLmNsYXNzTGlzdC5hZGQoXCJmbGlwLWFjdGl2ZVwiKTtcbiAgICBidXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBtYWluLm9uY2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGZsaXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImZsaXAtYWN0aXZlXCIpO1xuICAgICAgICBidXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfTtcbn07XG59O1xuXG5cblxuLy8gUEFSQUxMQVggMVxuXG5cbnZhciBwYXJhbGxheENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYXJhbGxheCcpO1xuXG5cdGlmKHBhcmFsbGF4Q29udGFpbmVyKSB7XG5cdHZhciAgbGF5ZXJzID0gcGFyYWxsYXhDb250YWluZXIuY2hpbGRyZW47XG5cblxuLy8g0KTRg9C90LrRhtC40Y8sINC60L7RgtC+0YDQsNGPINC+0YLRgdC70LXQttC40LLQsNC10YIg0L/QvtC30LjRhtC40Y4g0LrRg9GA0YHQvtGA0LAg0Lgg0L/RgNC+0LjQt9Cy0L7QtNC40YIg0YHQtNCy0LjQsyDQutCw0YDRgtC40L3QvtC6XG52YXIgbW92ZUxheWVycyA9IGZ1bmN0aW9uIChlKSB7XG5cdHZhciBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gZS5wYWdlWCxcblx0XHRpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIGUucGFnZVk7XG5cblx0W10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XG5cdFx0dmFyIGRpdmlkZXIgPSBpIC8gMTAwLFxuXHRcdFx0cG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxuXHRcdFx0cG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxuXHRcdFx0Ym90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxuXHRcdFx0bGF5ZXJTdHlsZSA9IGxheWVyLnN0eWxlLFxuXHRcdFx0dHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHggLCcgKyBwb3NpdGlvblkgKyAncHggLCAwKSc7XG5cblx0XHRsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcblx0XHRsYXllclN0eWxlLmJvdHRvbSA9ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4Jztcblx0fSk7XG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZUxheWVycyk7XG59XG4vL1BBUkFMTEFYIDEgIGVuZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxuXG5cbi8vIFBBUkFMTEFYIDIgc2Nyb2xsXG5cbnZhciBwYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciBiZyAgIFx0XHQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZXJvX19iZycpO1xuXHR2YXIgdXNlciBcdFx0PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVyb19fdXNlci1ibG9jaycpO1xuXHRcblxuXHRyZXR1cm4ge1xuXHRcdG1vdmU6IGZ1bmN0aW9uIChibG9jaywgd2luZG93U2Nyb2xsLCBzdHJhZmVBbW91bnQpIHtcblx0XHRcdHZhciBzdHJhZmUgPSB3aW5kb3dTY3JvbGwgLyAtc3RyYWZlQW1vdW50ICsgJyUnO1xuXHRcdFx0dmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLDApJztcblx0XHRcdHZhciBzdHlsZSAgPSBibG9jay5zdHlsZTtcblx0XHRcdHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcblx0XHRcdHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcblx0XHR9LFxuXG5cdFx0aW5pdDogZnVuY3Rpb24gKHdTY3JvbGwpIHtcblx0XHRcdHRoaXMubW92ZShiZywgd1Njcm9sbCwgNDUpO1xuXHRcdFx0dGhpcy5tb3ZlKHVzZXIsIHdTY3JvbGwsIDE1KTtcblx0XHR9XG5cdH1cblxufSgpKTtcblxud2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblx0cGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcbn07XG5cblxuLy9QQVJBTExBWCAyIHNjcm9sbCBlbmQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vIFByZWxvYWRlclxuXG52YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHBlcmNlbnRzVG90YWwgPSAwLFxuICAgICAgICBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XG5cbiAgICB2YXIgaW1nUGF0aCA9ICQoJyonKS5tYXAoZnVuY3Rpb24obmR4LCBlbGVtZW50KXtcbiAgICAgICAgdmFyIGJhY2tncm91bmQgPSAkKGVsZW1lbnQpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLFxuICAgICAgICAgICAgaW1nID0gJChlbGVtZW50KS5pcygnaW1nJyksXG4gICAgICAgICAgICBwYXRoID0gJyc7XG5cblxuICAgICAgICBpZihiYWNrZ3JvdW5kICE9ICdub25lJykge1xuICAgICAgICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYoaW1nKSB7XG4gICAgICAgICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHBhdGgpIHJldHVybiBwYXRoXG4gICAgfSk7XG5cblxuICAgIHZhciBzZXRQZXJjZW50ID0gZnVuY3Rpb24odG90YWwsIGN1cnJlbnQpIHtcbiAgICAgICAgdmFyIHBlcmNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XG5cbiAgICAgICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudHMnKS50ZXh0KHBlcmNlbnRzICsgJyUnKTtcblxuICAgICAgICBpZihwZXJjZW50cyA+PSAxMDApIHtcbiAgICAgICAgICAgIHByZWxvYWRlci5mYWRlT3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uIChpbWFnZXMpIHtcbiAgICAgICAgaWYoIWltYWdlcy5sZW5ndGgpIHByZWxvYWRlci5mYWRlT3V0KCk7XG5cbiAgICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24oaW1nLCBpLCBpbWFnZXMpIHtcbiAgICAgICAgICAgdmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+Jywge1xuICAgICAgICAgICAgICAgYXR0ciA6IHtcbiAgICAgICAgICAgICAgICAgICBzcmM6IGltZ1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xuICAgICAgICAgICAgICAgIHNldFBlcmNlbnQoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhpbWdzKTtcbiAgICAgICAgfVxuICAgIH1cbn0oKSk7XG5cblxuJChmdW5jdGlvbiAoKSB7XG4gICAgcHJlbG9hZGVyLmluaXQoKTtcbn0pO1xuXG4vL3ByZWxvYWRlciBlbmQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIG1hcCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiB2YXIgbWFwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1hcCcpO1xuIGlmIChtYXApIHtcbiAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZERvbUxpc3RlbmVyKHdpbmRvdywgJ2xvYWQnLCBpbml0KTtcbiAgICB2YXIgbWFwLCBtYXJrZXJzQXJyYXkgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGJpbmRJbmZvV2luZG93KG1hcmtlciwgbWFwLCBsb2NhdGlvbikge1xuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gY2xvc2UobG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBjbG9zZShsb2NhdGlvbik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hcmtlcnNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGxvYywgaW5kZXgpe1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jLmliICYmIGxvYy5pYiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2UobG9jKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIGJveFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBib3hUZXh0LnN0eWxlLmNzc1RleHQgPSAnYmFja2dyb3VuZDogI2ZmZjsnO1xuICAgICAgICAgICAgICAgIGJveFRleHQuY2xhc3NMaXN0LmFkZCgnbWQtd2hpdGVmcmFtZS0yZHAnKTtcblxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCBlbCwgcGFydCwgaWNvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb25bcGFydF0gPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9jYXRpb24uaXdbcGFydF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChlbCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGhvdG8nOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24ucGhvdG8pe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctcGhvdG9cIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnICsgbG9jYXRpb24ucGhvdG8gKyAnKTtcIj48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdpdy10b29sYmFyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctdG9vbGJhclwiPjxoMyBjbGFzcz1cIm1kLXN1YmhlYWRcIj4nICsgbG9jYXRpb24udGl0bGUgKyAnPC9oMz48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkaXYnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2gocGFydCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbWFpbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+PGEgaHJlZj1cIm1haWx0bzonICsgbG9jYXRpb24uZW1haWwgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIGxvY2F0aW9uLmVtYWlsICsgJzwvYT48L3NwYW4+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dlYic6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+PGEgaHJlZj1cIicgKyBsb2NhdGlvbi53ZWIgKyAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+JyArIGxvY2F0aW9uLndlYl9mb3JtYXR0ZWQgKyAnPC9hPjwvc3Bhbj48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGVzYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8bGFiZWwgY2xhc3M9XCJpdy1kZXNjXCIgZm9yPVwiY2JfZGV0YWlsc1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNiX2RldGFpbHNcIi8+PGgzIGNsYXNzPVwiaXcteC1kZXRhaWxzXCI+RGV0YWlsczwvaDM+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyB0b2dnbGUtb3Blbi1kZXRhaWxzXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHAgY2xhc3M9XCJpdy14LWRldGFpbHNcIj4nICsgbG9jYXRpb24uZGVzYyArICc8L3A+PC9sYWJlbD4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPicgKyBsb2NhdGlvbltwYXJ0XSArICc8L3NwYW4+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29wZW5faG91cnMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uLm9wZW5faG91cnMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0aW9uLm9wZW5faG91cnMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zICs9ICc8bGk+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1tpXS5kYXkgKyAnPC9zdHJvbmc+PHN0cm9uZz4nICsgbG9jYXRpb24ub3Blbl9ob3Vyc1tpXS5ob3VycyArJzwvc3Ryb25nPjwvbGk+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gJzxsaT48bGFiZWwgZm9yPVwiY2JfaG91cnNcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYl9ob3Vyc1wiLz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmRheSArICc8L3N0cm9uZz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmhvdXJzICsnPC9zdHJvbmc+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyB0b2dnbGUtb3Blbi1ob3Vyc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zL2tleWJvYXJkX2Fycm93X2Rvd24uc3ZnXCIvPjwvaT48dWw+JyArIGl0ZW1zICsgJzwvdWw+PC9sYWJlbD48L2xpPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1saXN0XCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBmaXJzdC1tYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48dWw+JyArIGZpcnN0ICsgJzwvdWw+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYm94VGV4dC5pbm5lckhUTUwgPSBcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdwaG90bycsICdwaG90bycsICcnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnaXctdG9vbGJhcicsICd0aXRsZScsICcnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2FkZHJlc3MnLCAnbG9jYXRpb25fb24nKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ3dlYicsICdwdWJsaWMnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2VtYWlsJywgJ2VtYWlsJykgK1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICd0ZWwnLCAncGhvbmUnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2ludF90ZWwnLCAncGhvbmUnKSArXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnb3Blbl9ob3VycycsICdvcGVuX2hvdXJzJywgJ2FjY2Vzc190aW1lJykgK1xuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdkZXNjJywgJ2tleWJvYXJkX2Fycm93X2Rvd24nKTtcblxuICAgICAgICAgICAgICAgIHZhciBteU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFsaWduQm90dG9tOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBib3hUZXh0LFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQXV0b1BhbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgICAgIHBpeGVsT2Zmc2V0OiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgtMTQwLCAtNDApLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IG51bGwsXG4gICAgICAgICAgICAgICAgICAgIGJveFN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcyODBweCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCb3hNYXJnaW46ICcwcHggMHB4IDBweCAwcHgnLFxuICAgICAgICAgICAgICAgICAgICBpbmZvQm94Q2xlYXJhbmNlOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgxLCAxKSxcbiAgICAgICAgICAgICAgICAgICAgaXNIaWRkZW46IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBwYW5lOiAnZmxvYXRQYW5lJyxcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlRXZlbnRQcm9wYWdhdGlvbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBuZXcgSW5mb0JveChteU9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliLm9wZW4obWFwLCBtYXJrZXIpO1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIG1hcE9wdGlvbnMgPSB7XG4gICAgICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTkuOTg1NTkzNjYwOTIyMzA1LDMwLjM1MjA3NjQzNzI1NTg0NiksXG4gICAgICAgICAgICB6b29tOiAxMyxcbiAgICAgICAgICAgIGdlc3R1cmVIYW5kbGluZzogJ2F1dG8nLFxuICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlLFxuICAgICAgICAgICAgem9vbUNvbnRyb2w6IHRydWUsXG4gICAgICAgICAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tOiBmYWxzZSxcbiAgICAgICAgICAgIG1hcFR5cGVDb250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXG4gICAgICAgICAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2UsXG4gICAgICAgICAgICBkcmFnZ2FibGUgOiB0cnVlLFxuICAgICAgICAgICAgY2xpY2thYmxlSWNvbnM6IGZhbHNlLFxuICAgICAgICAgICAgem9vbUNvbnRyb2xPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9UT1BcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxuICAgICAgICAgICAgc3R5bGVzOiBbe1wiZmVhdHVyZVR5cGVcIjpcIndhdGVyXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDZiY2VjXCJ9LHtcInZpc2liaWxpdHlcIjpcIm9uXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJsaWdodG5lc3NcIjo0NX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcInNpbXBsaWZpZWRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NDQ0NDRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicG9pXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19XVxuICAgICAgICB9XG4gICAgICAgIHZhciBtYXBFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcGtpdC05NjUwJyk7XG4gICAgICAgIHZhciBtYXAgPSBuZXcgZ29vZ2xlLm1hcHMuTWFwKG1hcEVsZW1lbnQsIG1hcE9wdGlvbnMpO1xuICAgICAgICB2YXIgbG9jYXRpb25zID0gW1xuICAgICAgICAgICAge1widGl0bGVcIjpcItCf0LDRgNCz0L7Qu9C+0LLRgdC60LDRjyDRg9C7LiwgMTFcIixcImFkZHJlc3NcIjpcIlwiLFwiZGVzY1wiOlwiXCIsXCJ0ZWxcIjpcIlwiLFwiaW50X3RlbFwiOlwiXCIsXCJlbWFpbFwiOlwiXCIsXCJ3ZWJcIjpcIlwiLFwid2ViX2Zvcm1hdHRlZFwiOlwiXCIsXCJvcGVuXCI6XCJcIixcInRpbWVcIjpcIlwiLFwibGF0XCI6NTkuOTg2MTY1NCxcImxuZ1wiOjMwLjM0NTM3Njk5OTk5OTk4NSxcInZpY2luaXR5XCI6XCLQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQs1wiLFwib3Blbl9ob3Vyc1wiOlwiXCIsXCJtYXJrZXJcIjp7XCJmaWxsQ29sb3JcIjpcIiMwMjg4RDFcIixcImZpbGxPcGFjaXR5XCI6MSxcInN0cm9rZVdlaWdodFwiOjAsXCJzY2FsZVwiOjEuNSxcInBhdGhcIjpcIk0xMC4yLDcuNGMtNiwwLTEwLjksNC45LTEwLjksMTAuOWMwLDYsMTAuOSwxOC40LDEwLjksMTguNHMxMC45LTEyLjMsMTAuOS0xOC40QzIxLjIsMTIuMiwxNi4zLDcuNCwxMC4yLDcuNHogTTEwLjIsMjIuOWMtMi42LDAtNC42LTIuMS00LjYtNC42czIuMS00LjYsNC42LTQuNnM0LjYsMi4xLDQuNiw0LjZTMTIuOCwyMi45LDEwLjIsMjIuOXpcIixcImFuY2hvclwiOntcInhcIjoxMCxcInlcIjozMH0sXCJvcmlnaW5cIjp7XCJ4XCI6MCxcInlcIjowfSxcInN0eWxlXCI6MX0sXCJpd1wiOntcImFkZHJlc3NcIjp0cnVlLFwiZGVzY1wiOnRydWUsXCJlbWFpbFwiOnRydWUsXCJlbmFibGVcIjp0cnVlLFwiaW50X3RlbFwiOnRydWUsXCJvcGVuXCI6dHJ1ZSxcIm9wZW5faG91cnNcIjp0cnVlLFwicGhvdG9cIjp0cnVlLFwidGVsXCI6dHJ1ZSxcInRpdGxlXCI6dHJ1ZSxcIndlYlwiOnRydWV9fVxuICAgICAgICBdO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcbiAgICAgICAgICAgICAgICBpY29uOiBsb2NhdGlvbnNbaV0ubWFya2VyLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxvY2F0aW9uc1tpXS5sYXQsIGxvY2F0aW9uc1tpXS5sbmcpLFxuICAgICAgICAgICAgICAgIG1hcDogbWFwLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBsb2NhdGlvbnNbaV0udGl0bGUsXG4gICAgICAgICAgICAgICAgYWRkcmVzczogbG9jYXRpb25zW2ldLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgZGVzYzogbG9jYXRpb25zW2ldLmRlc2MsXG4gICAgICAgICAgICAgICAgdGVsOiBsb2NhdGlvbnNbaV0udGVsLFxuICAgICAgICAgICAgICAgIGludF90ZWw6IGxvY2F0aW9uc1tpXS5pbnRfdGVsLFxuICAgICAgICAgICAgICAgIHZpY2luaXR5OiBsb2NhdGlvbnNbaV0udmljaW5pdHksXG4gICAgICAgICAgICAgICAgb3BlbjogbG9jYXRpb25zW2ldLm9wZW4sXG4gICAgICAgICAgICAgICAgb3Blbl9ob3VyczogbG9jYXRpb25zW2ldLm9wZW5faG91cnMsXG4gICAgICAgICAgICAgICAgcGhvdG86IGxvY2F0aW9uc1tpXS5waG90byxcbiAgICAgICAgICAgICAgICB0aW1lOiBsb2NhdGlvbnNbaV0udGltZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogbG9jYXRpb25zW2ldLmVtYWlsLFxuICAgICAgICAgICAgICAgIHdlYjogbG9jYXRpb25zW2ldLndlYixcbiAgICAgICAgICAgICAgICBpdzogbG9jYXRpb25zW2ldLml3XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG1hcmtlcnNBcnJheS5wdXNoKG1hcmtlcik7XG5cbiAgICAgICAgICAgIGlmIChsb2NhdGlvbnNbaV0uaXcuZW5hYmxlID09PSB0cnVlKXtcbiAgICAgICAgICAgICAgICBiaW5kSW5mb1dpbmRvdyhtYXJrZXIsIG1hcCwgbG9jYXRpb25zW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgYXJyYXlzID0gW107XG4gICAgICAgIHdoaWxlIChsb2NhdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYXJyYXlzLnB1c2gobG9jYXRpb25zLnNwbGljZSgwLCA1KSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG1ha2VSb3V0ZXMoYXJyYXlzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBtYWtlUm91dGVzKGxvY2F0aW9ucykge1xuICAgICAgICAgICAgdmFyIHdheXB0cyA9IFtdO1xuICAgICAgICAgICAgdmFyIGRpcmVjdGlvbnNTZXJ2aWNlID0gbmV3IGdvb2dsZS5tYXBzLkRpcmVjdGlvbnNTZXJ2aWNlKCk7XG4gICAgICAgICAgICB2YXIgZGlyZWN0aW9uc0Rpc3BsYXkgPSBuZXcgZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1JlbmRlcmVyKHtcbiAgICAgICAgICAgICAgICBzdXBwcmVzc01hcmtlcnM6IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlc2VydmVWaWV3cG9ydDogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobG9jYXRpb25zLmxlbmd0aCA+IDEpe1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHdheXB0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOm5ldyBnb29nbGUubWFwcy5MYXRMbmcobG9jYXRpb25zW2ldLmxhdCwgbG9jYXRpb25zW2ldLmxuZyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wb3Zlcjp0cnVlXG4gICAgICAgICAgICAgICAgICAgIH0pOyBcbiAgICAgICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcmVxdWVzdCA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW46IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobG9jYXRpb25zWzBdLmxhdCwgbG9jYXRpb25zWzBdLmxuZyksXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobG9jYXRpb25zW2xvY2F0aW9ucy5sZW5ndGggLSAxXS5sYXQsIGxvY2F0aW9uc1tsb2NhdGlvbnMubGVuZ3RoIC0gMV0ubG5nKSxcbiAgICAgICAgICAgICAgICB3YXlwb2ludHM6IHdheXB0cyxcbiAgICAgICAgICAgICAgICBvcHRpbWl6ZVdheXBvaW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmF2ZWxNb2RlOiBnb29nbGUubWFwcy5EaXJlY3Rpb25zVHJhdmVsTW9kZS5EUklWSU5HXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZGlyZWN0aW9uc1NlcnZpY2Uucm91dGUocmVxdWVzdCwgZnVuY3Rpb24ocmVzcG9uc2UsIHN0YXR1cykge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMgPT0gZ29vZ2xlLm1hcHMuRGlyZWN0aW9uc1N0YXR1cy5PSykge1xuICAgICAgICAgICAgICAgICAgICBwb2x5bGluZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogJyM4MDgwODAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2VpZ2h0OiAnMSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zRGlzcGxheS5zZXRPcHRpb25zKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvbHlsaW5lT3B0aW9uczogcG9seWxpbmVPcHRpb25zXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb25zRGlzcGxheS5zZXREaXJlY3Rpb25zKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRpcmVjdGlvbnNEaXNwbGF5LnNldE1hcChtYXApO1xuICAgICAgICB9XG4gICBcbiAgICB9XG59XG4vL21hcCBlbmQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbi8vaGFtYnVyZ2VyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbnZhciBoYW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LXRvZ2dsZXInKTtcblxuaWYoaGFtYikge1xudmFyIEhhbWJ1cmdlciA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciAgIGJvZHkgPSAkKCdib2R5JyksXG4gICAgICAgIGhhbWJ1cmdlciA9ICQoJy5tZW51LXRvZ2dsZXInKTtcblxuICByZXR1cm4ge1xuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGhhbWJ1cmdlci5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBib2R5LnRvZ2dsZUNsYXNzKCdib2R5X2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59KCkpO1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgaWYgKEhhbWJ1cmdlcikge1xuICAgIEhhbWJ1cmdlci5pbml0KCk7XG4gIH1cbn0pO1xuXG59O1xuXG5cblxuXG5cbiJdfQ==
