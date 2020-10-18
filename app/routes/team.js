const express = require("express");
const router = express.Router();

// Article Model
let Footballer = require("../models/footballer");
// User Model
let User = require("../models/user");

//Add Route
router.get("/", ensureAuthenticated, function (req, res) {
  var gBudget = req.user.budget / 1000;
  gBudget += " M€";

  var footballerIds = req.user.footballers;
  console.log("footballerIds=" + footballerIds[0]);
  console.log("footballerIds=" + footballerIds[1]);
  console.log("footballerIds=" + footballerIds[2]);
  console.log("footballerIds=" + footballerIds[3]);
  console.log("footballerIds=" + footballerIds[4]);
  console.log("footballerIds=" + footballerIds[5]);
  console.log("footballerIds=" + footballerIds[6]);
  console.log("footballerIds=" + footballerIds[7]);
  console.log("footballerIds=" + footballerIds[8]);
  console.log("footballerIds=" + footballerIds[9]);
  console.log("Length=" + footballerIds.length);
  var footballers = {
    list: []
  };
  
  var fbCnt = footballerIds.length;
  if(!fbCnt){
    console.log("Footballer =" + JSON.stringify(footballers));
    
    res.render("team", {
      title: req.user.name,
      budget: gBudget,
      footballers: footballers.list
    });
  }
  for(var i = 0; i < footballerIds.length; i++){
    var fbId = footballerIds[i];
    console.log("fbObj=" + fbId);
    Footballer.findOne({id: fbId}, function(err, result) {
      
      if (err) {
        console.log(err);
      } else {
        footballers.list.push({ 
          "id" : result.id,
          "name"  : result.name,
          "firstName"  : result.firstName,
          "lastName"  : result.lastName,
          "teamId"  : result.teamId,
          "teamName"       : result.teamName,
          "playedPositions"       : result.playedPositions,
          "positionText"       : "result.positionText",
          "height"       : result.height,
          "weight"       : result.weight,
          "age"       : result.age,
          "minsPlayed"       : result.minsPlayed,
          "rating"       : result.rating
        });
      }
      
    })
    .then(function (doc) {
      fbCnt--;
      if(fbCnt==0){        
        console.log("Footballer =" + JSON.stringify(footballers));
        res.render("team", {
          title: req.user.name,
          budget: gBudget,
          footballers: footballers.list
        });
      }
    });
  }
  // console.log("footballerArr=" + footballerArr);
  // res.redirect("/users/login");
  // res.render("team", {
  //         title: req.user.name,
  //         footballers: footballerArr
  //       });
  // Footballer.find({}, function (err, footballers) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render("team", {
  //       title: req.user.name,
  //       footballers: footballers
  //     });
  //   }
  // });
});

async function getPositions() {
  var db =  await MongoClient.connect(url);
  var positions = await db.collection("positions").find[0];
  console.log(positions.position);
  return positions.position;
}
async function getTeams() {
  var db =  await MongoClient.connect(url);
  var teams = await db.collection("teams").find;
  console.log(teams);
  return teams;
}



router.get("/arrange", ensureAuthenticated, function (req, res) {
  var gBudget = req.user.budget / 1000;
  gBudget += " M€";

  var positions = getPositions();
  var teams = getTeams();

  var footballerIds = req.user.footballers;
  
  var footballers = {
    list: []
  };
  
  var fbCnt = footballerIds.length;
  if(!fbCnt){
    console.log("Footballer =" + JSON.stringify(footballers));
    
    res.render("arrange_team", {
      title: req.user.name,
      budget: gBudget,
      footballers: footballers.list
    });
  }
  for(var i = 0; i < footballerIds.length; i++){
    var fbId = footballerIds[i];
    console.log("fbObj=" + fbId);
    Footballer.findOne({id: fbId}, function(err, result) {
      
      if (err) {
        console.log(err);
      } else {
        footballers.list.push({ 
          "id" : result.id,
          "name"  : result.name,
          "firstName"  : result.firstName,
          "lastName"  : result.lastName,
          "teamId"  : result.teamId,
          "teamName"       : result.teamName,
          "playedPositions"       : result.playedPositions,
          "positionText"       : result.positionText,
          "height"       : result.height,
          "weight"       : result.weight,
          "age"       : result.age,
          "minsPlayed"       : result.minsPlayed,
          "rating"       : result.rating
        });
      }
      
    })
    .then(function (doc) {
      fbCnt--;
      if(fbCnt==0){
        console.log("Footballer =" + JSON.stringify(footballers));
        res.render("arrange_team", {
          title: req.user.name,
          budget: gBudget,
          footballers: footballers.list,
          teams: teams,
          positions: positions
        });
      }
    });
  }
  // console.log("footballerArr=" + footballerArr);
  // res.redirect("/users/login");
  // res.render("team", {
  //         title: req.user.name,
  //         footballers: footballerArr
  //       });
  // Footballer.find({}, function (err, footballers) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.render("team", {
  //       title: req.user.name,
  //       footballers: footballers
  //     });
  //   }
  // });
});

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("danger", "Please login");
    res.redirect("/users/login");
  }
}

function getFootballers2(footballerIds){
  
  var footballers = {
    list: []
  };
  var totalLength = footballerIds.length;
  for(var i = 0; i < footballerIds.length; i++){
    (new Promise((res, rej) => {
      var fbId = footballerIds[i];
      console.log("fbObj=" + fbId);
      Footballer.findOne({id: fbId}, function(err, result) {
        if (err) {
          console.log(err);
          rej(err);
        } else {
          console.log("Footballer =" + JSON.stringify(result));
          footballers.list.push({ 
              "id" : result.id,
              "name"  : result.name,
              "firstName"  : result.firstName,
              "lastName"  : result.lastName,
              "teamId"  : result.teamId,
              "teamName"       : result.teamName,
              "playedPositions"       : result.playedPositions,
              "height"       : result.height,
              "weight"       : result.weight,
              "age"       : result.age,
              "minsPlayed"       : result.minsPlayed,
              "rating"       : result.rating
          });
        }
      });
      res(true); 
    })).then(result => {
      totalLength--;
      if(totalLength == 0)
        return footballers;
    });
  }
}

function getFootballers(footballerIds){
  var footballers = {
    list: []
  };
  return new Promise((res, rej) => {
    
    for(var i = 0; i < footballerIds.length; i++){
      var fbId = footballerIds[i];
      console.log("fbObj=" + fbId);
      Footballer.findOne({id: fbId}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("Footballer =" + JSON.stringify(result));
          footballers.list.push({ 
              "id" : result.id,
              "name"  : result.name,
              "firstName"  : result.firstName,
              "lastName"  : result.lastName,
              "teamId"  : result.teamId,
              "teamName"       : result.teamName,
              "playedPositions"       : result.playedPositions,
              "height"       : result.height,
              "weight"       : result.weight,
              "age"       : result.age,
              "minsPlayed"       : result.minsPlayed,
              "rating"       : result.rating
          });
        }
      });
    }
    res(footballers);
  });
}
module.exports = router;
