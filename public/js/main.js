
function populateFields() {
    hotels.forEach(function(elem) {
        $('*[data-type="hotels"]').append(`<option>${elem.name}</option>`)
    })
     restaurants.forEach(function(elem) {
        $('*[data-type="restaurants"]').append(`<option>${elem.name}</option>`)
    })
    activities.forEach(function(elem) {
        $('*[data-type="activities"]').append(`<option>${elem.name}</option>`)
    })
}

$(document).ready(function() {
    populateFields()
})



function Day() {
    this.hotels = {};
    this.restaurants = {};
    this.activities = {}    
  }


var daysArr = [new Day()];

$(function initializeMap () {

  const fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  const styleArr = [
    {
      featureType: 'landscape',
      stylers: [{ saturation: -100 }, { lightness: 60 }]
    },
    {
      featureType: 'road.local',
      stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
    },
    {
      featureType: 'transit',
      stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
    },
    {
      featureType: 'administrative.province',
      stylers: [{ visibility: 'off' }]
    },
    {
      featureType: 'water',
      stylers: [{ visibility: 'on' }, { lightness: 30 }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
    }, 
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ visibility: 'off' }]
    }, 
    {
      featureType: 'poi.park',
      elementType: 'geometry.fill',
      stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
    }
  ];

  const mapCanvas = document.getElementById('map-canvas');

  const currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  const iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    const latLng = new google.maps.LatLng(coords[0], coords[1]);
    const marker = new google.maps.Marker({
      position: latLng
    });
    marker.setMap(currentMap);
  }

    $('#add-hotel').click(function() {
      var hotelName = $("*[data-type='hotels'] option:selected").text()
      $('#hotel-list').append(`<div class="itinerary-item"><span class="title">${hotelName}</span>
      <button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`)
      var hotelCoord = findCoordinates(hotels, hotelName);
      drawMarker('hotel', hotelCoord);
      var activeDay = $('.current-day').text();
      daysArr[+activeDay-1].hotels[hotelName] = hotelCoord;
      // console.log(daysArr);
  })

  $('#add-restaurant').click(function() {
      var restaurantName = $("*[data-type='restaurants'] option:selected").text()
      $('#restaurant-list').append(`<div class="itinerary-item"><span class="title">${restaurantName}</span>
      <button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`)
      var restCoord = findCoordinates(restaurants, restaurantName);
      drawMarker('restaurant', restCoord);
      var activeDay = $('.current-day').text();
      daysArr[+activeDay-1].restaurants[restaurantName] = restCoord;
            // console.log(daysArr);
  })

  $('#add-activity').click(function() {
      var activityName = $("*[data-type='activities'] option:selected").text()
      $('#activity-list').append(`<div class="itinerary-item"><span class="title">${activityName}</span>
      <button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`)
      
      var activityCoord = findCoordinates(activities, activityName);
      drawMarker('activity', activityCoord);
      var activeDay = $('.current-day').text();
      daysArr[+activeDay-1].activities[activityName] = activityCoord;
            // console.log(daysArr);
  })


  function findCoordinates(table, itemName){
      for(var i=0; i<table.length; i++){
          if(table[i].name === itemName){
              return table[i].place.location
          }
      }
  }


  $('#itinerary').on('click', '.remove', function(event){
    ($(event.target).parent().children().remove());
    // marker.setMap(null);
})

});



// $('#itinerary').on('click', '.remove', function(event){
//     ($(event.target).parent().children().remove());
// })
var dayNum = 2;
$('#day-add').click(function() {
    $(`<button class="btn btn-circle day-btn">${dayNum}</button>`).appendTo('.day-buttons')

    daysArr.push(new Day());
    dayNum++
})

$('.day-buttons').click(function(event){
  $(this).children().removeClass('current-day');
  $(event.target).addClass('current-day');
  
})



