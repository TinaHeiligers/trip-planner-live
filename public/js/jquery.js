// $('*[data-type="hotels"]').

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



$('#add-hotel').click(function() {
    var hotelName = $("*[data-type='hotels'] option:selected").text()
    $('#hotel-list').append(`<div class="itinerary-item"><span class="title">${hotelName}</span>
    <button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`)
})

$('#add-restaurant').click(function() {
    var restaurantName = $("*[data-type='restaurants'] option:selected").text()
    $('#restaurant-list').append(`<div class="itinerary-item"><span class="title">${restaurantName}</span>
    <button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`)
})

$('#add-activity').click(function() {
    var activityName = $("*[data-type='activities'] option:selected").text()
    $('#activity-list').append(`<div class="itinerary-item"><span class="title">${activityName}</span>
    <button class="btn btn-xs btn-danger remove btn-circle">x</button></div>`)
})




