$(document).ready(function() {
    const db = $.get('/api').then(function(db) {
      db.hotels.forEach(function(elem) {
          $('*[data-type="hotels"]').append(`<option>${elem.name}</option>`)
      })
      db.restaurants.forEach(function(elem) {
          $('*[data-type="restaurants"]').append(`<option>${elem.name}</option>`)
      })
      db.activities.forEach(function(elem) {
          $('*[data-type="activities"]').append(`<option>${elem.name}</option>`)
      })
    })
    $.post('/api/day', {number: 1}).catch()
    
    console.log(db)
})



// function Day() {
//     this.hotels = {};
//     this.restaurants = {};
//     this.activities = {}    
//   }


// var daysArr = [new Day()];

function setItineraryItem(type, name) {
    $(`#${type}-list`).append(`<div class="itinerary-item"><span class="title">${name}</span>
      <button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`)      
}

function addEventToDay(type, name, dayNum) {
  switch (type) {
        case 'hotel': $.post('/api/addHotel', {dayNum: dayNum, hotelName: name}).catch() 
            break;
        case 'restaurant': $.post('/api/addRestaurant', {dayNum: dayNum, restaurantName: name}).catch()
            break;
        case 'activity': $.post('/api/addActivity', {dayNum: dayNum, activityName: name}).catch()
            break;
        }
}

    $('#add-hotel').click(function() {
      var hotelName = $("*[data-type='hotels'] option:selected").text()
      var activeDay = $('.current-day').text();
      setItineraryItem('hotel', hotelName)
      addEventToDay('hotel', hotelName, activeDay)

      var hotelCoord = findCoordinates(hotels, hotelName);
      drawMarker('hotel', hotelCoord);
      
      // daysArr[+activeDay-1].hotels[hotelName] = hotelCoord;
  })

  $('#add-restaurant').click(function() {
      var restaurantName = $("*[data-type='restaurants'] option:selected").text()
      var activeDay = $('.current-day').text();
     setItineraryItem('restaurant', restaurantName)
      addEventToDay('restaurant', restaurantName, activeDay)
      
      var restCoord = findCoordinates(restaurants, restaurantName);
      drawMarker('restaurant', restCoord);
      
      //daysArr[+activeDay-1].restaurants[restaurantName] = restCoord;
  })

  $('#add-activity').click(function() {
      var activityName = $("*[data-type='activities'] option:selected").text()
      var activeDay = $('.current-day').text();
      setItineraryItem('activity', activityName)
      addEventToDay('activity', activityName, activeDay)
      
      var activityCoord = findCoordinates(activities, activityName);
      drawMarker('activity', activityCoord);
      
      //daysArr[+activeDay-1].activities[activityName] = activityCoord;
  })


  function findCoordinates(table, itemName){
      for(var i=0; i<table.length; i++){
          if(table[i].name === itemName){
              return table[i].place.location
          }
      }
  }


  $('#itinerary').on('click', '.remove', function(event){
    //CODE THAT'S TRYING TO DELETE THE ITEM FROM OUR DAYSARR
    //  var activeDay = $('.current-day').text();
    //  var list;
    //  if ($(event.target).parent().parent().attr('id').includes('hotel')) list = 'hotels'
    //  else if($(event.target).parent().parent().attr('id').includes('restaurant')) list = 'restaurants'
    //  else if ($(event.target).parent().parent().attr('id').includes('activity')) list = 'activities'
    //   var listItem = $(event.target).parent().find('span').text()
    //   var index = daysArr[+activeDay-1]
    //   console.log(index[list][listItem])
    //   delete index[list][listItem]
      ($(event.target).parent().children().remove());
})

var dayNum = 1;
$('#day-add').click(function() {
    dayNum++
    $(`<button class="btn btn-circle day-btn">${dayNum}</button>`).appendTo('.day-buttons')
    $.post('/api/day', {number: dayNum}).catch()
    //daysArr.push(new Day());
    
})

$('.day-buttons').click(function(event){
  var currentDay = $(event.target)
  $(this).children().removeClass('current-day');
  currentDay.addClass('current-day');


  $.get(`/api/day/${dayNum}`)
    .then(function(obj) {
      for (var key in obj) {
        setItineraryItem(key, obj[key].name)
      } 
    }).catch(console.error)

  $('#hotel-list,#restaurant-list,#activity-list').children().remove()
  var activeDay = $('.current-day').text();
  var thatDaysHotels = Object.keys(daysArr[+activeDay-1].hotels)
  thatDaysHotels.forEach(function(elem) {
    setItineraryItem('hotel', elem)
  })
  var thatDaysRestaurants = Object.keys(daysArr[+activeDay-1].restaurants)
  thatDaysRestaurants.forEach(function(elem) {
    setItineraryItem('restaurant', elem)
  })
  var thatDaysActivities = Object.keys(daysArr[+activeDay-1].activities)
  thatDaysActivities.forEach(function(elem) {
    setItineraryItem('activity', elem)
  })
  
})

$('#day-delete').click(function() {
  $('.current-day').remove()
})

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
    console.log(marker)
  }

//   function setItineraryItem(type, name) {
//     $(`#${type}-list`).append(`<div class="itinerary-item"><span class="title">${name}</span>
//       <button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`)
//   }

//     $('#add-hotel').click(function() {
//       var hotelName = $("*[data-type='hotels'] option:selected").text()
//       setItineraryItem('hotel', hotelName)
//       var hotelCoord = findCoordinates(hotels, hotelName);
//       drawMarker('hotel', hotelCoord);
//       var activeDay = $('.current-day').text();
//       daysArr[+activeDay-1].hotels[hotelName] = hotelCoord;
//   })

//   $('#add-restaurant').click(function() {
//       var restaurantName = $("*[data-type='restaurants'] option:selected").text()
//      setItineraryItem('restaurant', restaurantName)
//       var restCoord = findCoordinates(restaurants, restaurantName);
//       drawMarker('restaurant', restCoord);
//       var activeDay = $('.current-day').text();
//       daysArr[+activeDay-1].restaurants[restaurantName] = restCoord;
//   })

//   $('#add-activity').click(function() {
//       var activityName = $("*[data-type='activities'] option:selected").text()
//       setItineraryItem('activity', activityName)
//       var activityCoord = findCoordinates(activities, activityName);
//       drawMarker('activity', activityCoord);
//       var activeDay = $('.current-day').text();
//       daysArr[+activeDay-1].activities[activityName] = activityCoord;
//   })


//   function findCoordinates(table, itemName){
//       for(var i=0; i<table.length; i++){
//           if(table[i].name === itemName){
//               return table[i].place.location
//           }
//       }
//   }


//   $('#itinerary').on('click', '.remove', function(event){
//     //CODE THAT'S TRYING TO DELETE THE ITEM FROM OUR DAYSARR
//     //  var activeDay = $('.current-day').text();
//     //  var list;
//     //  if ($(event.target).parent().parent().attr('id').includes('hotel')) list = 'hotels'
//     //  else if($(event.target).parent().parent().attr('id').includes('restaurant')) list = 'restaurants'
//     //  else if ($(event.target).parent().parent().attr('id').includes('activity')) list = 'activities'
//     //   var listItem = $(event.target).parent().find('span').text()
//     //   var index = daysArr[+activeDay-1]
//     //   console.log(index[list][listItem])
//     //   delete index[list][listItem]
//       ($(event.target).parent().children().remove());
// })

// var dayNum = 2;
// $('#day-add').click(function() {
//     $(`<button class="btn btn-circle day-btn">${dayNum}</button>`).appendTo('.day-buttons')
//     daysArr.push(new Day());
//     dayNum++
// })

// $('.day-buttons').click(function(event){
//   $(this).children().removeClass('current-day');
//   $(event.target).addClass('current-day');
//   $('#hotel-list,#restaurant-list,#activity-list').children().remove()
//   var activeDay = $('.current-day').text();
//   var thatDaysHotels = Object.keys(daysArr[+activeDay-1].hotels)
//   thatDaysHotels.forEach(function(elem) {
//     setItineraryItem('hotel', elem)
//   })
//   var thatDaysRestaurants = Object.keys(daysArr[+activeDay-1].restaurants)
//   thatDaysRestaurants.forEach(function(elem) {
//     setItineraryItem('restaurant', elem)
//   })
//   var thatDaysActivities = Object.keys(daysArr[+activeDay-1].activities)
//   thatDaysActivities.forEach(function(elem) {
//     setItineraryItem('activity', elem)
//   })
  
// })

// $('#day-delete').click(function() {
//   $('.current-day').remove()
// })

});





