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



// $('#itinerary').on('click', '.remove', function(event){
//     ($(event.target).parent().children().remove());
// })
var dayNum = 2;
$('#day-add').click(function() {
    $(`<button class="btn btn-circle day-btn">${dayNum}</button>`).insertBefore(this)
    // parent().last().prev()
    // .append(`<button class="btn btn-circle day-btn">${dayNum}</button>`)
    dayNum++
})

