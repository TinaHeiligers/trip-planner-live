'use strict';
var Promise = require('bluebird');
var router = require('express').Router();

var db = require('../../models');
var Hotel = db.model('hotel');
var Restaurant = db.model('restaurant');
var Activity = db.model('activity');
var Place = db.model('place');
var Day = db.model('day');


router.get('/', (req, res, next) =>
    Promise.props({
        hotels: Hotel.findAll({ include: [Place] }),
        restaurants: Restaurant.findAll({ include: [Place] }),
        activities: Activity.findAll({ include: [Place] }),
        days: Day.findAll()
    })
        .then(data => res.json(data))

        .catch(next)
)

// Use Fetch (built in browser API):
//
//   IDK, look it up on MDN?
//
// Use jQuery's $.post:
//
//   $.post('//echo', {hello: 'world'}).then(doSomethingWithIt)



router.post('/addHotel', (req, res, next) => {
    var day = Day.findOne({where:{number: +req.body.dayNum}})
    var hotel = Hotel.findOne({where:{name: req.body.hotelName}})
    Promise.all([day, hotel])
    .spread(function(day, hotel) {
        day.setHotel(hotel)
    }).catch(next)
})

router.post('/addRestaurant', (req, res, next) => {
    var day = Day.findOne({where:{number: +req.body.dayNum}})
    var restaurant = Restaurant.findOne({where:{name: req.body.restaurantName}})
    Promise.all([day, restaurant])
    .spread(function(day, restaurant) {
        day.addRestaurant(restaurant)
    }).catch(next)
})

router.post('/addActivity', (req, res, next) => {
    var day = Day.findOne({where:{number: +req.body.dayNum}})
    var activity = Activity.findOne({where:{name: req.body.activityName}})
    Promise.all([day, activity])
    .spread(function(day, activity) {
        day.addActivity(activity)
    }).catch(next)
})

router.post('/day',
    (req, res, next) =>
    // console.log(req.body)
        Day.create(req.body)
            .then(day => res.json(day))
            .catch(next))

router.get('/day/:number', function(req, res, next) {
    var num = +req.params.number
    Day.findOne({where: {number: num}})
    .then(function(day) {
        return Promise.props({
            hotel: day.getHotel(),
            restaurant: day.getRestaurants(),
            activity: day.getActivities()
        })
    }) 
    .then(function(data) { 
        res.json(data)
    }).catch(next)
})





module.exports = router;