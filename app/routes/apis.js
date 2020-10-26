const express = require('express');
const router = express.Router();

router.get("/curr_week", function (req, res) {
    var d = new Date();    
    res.send(getWeekId(d));
});
router.get("/", function (req, res) {
    var d = new Date();
    getWeekId(d);
});

weeks = {
    "202007" : new Date(2020, 9, 23, 18, 0, 0, 0),
    "202008" : new Date(2020, 9, 30, 18, 0, 0, 0),
    "202009" : new Date(2020, 10,  6, 18, 0, 0, 0),
    "202010" : new Date(2020, 10, 13, 18, 0, 0, 0),
    "202011" : new Date(2020, 10, 20, 18, 0, 0, 0),
    "202012" : new Date(2020, 10, 27, 18, 0, 0, 0),
    "202013" : new Date(2020, 11,  4, 18, 0, 0, 0),
    "202014" : new Date(2020, 11, 11, 18, 0, 0, 0),
    "202015" : new Date(2020, 11, 18, 18, 0, 0, 0),
    "202016" : new Date(2020, 11, 25, 18, 0, 0, 0),
    "202017" : new Date(2021,  0,  1, 18, 0, 0, 0),
    "202018" : new Date(2021,  0,  8, 18, 0, 0, 0)
};

function getWeekId(date){
    console.log("Now: " + date);
    var currentWeek;
    for(var week in weeks){       
        if(weeks[week] > date){
            return currentWeek;
        }                    
        currentWeek = week;
    }
}

module.exports = router;