const express = require("express");
const router = express.Router();

// Footballer Model
let Footballer = require("../models/footballer");
// Team Model
let Team = require("../models/team");
// Position Model
let Position = require("../models/position");
// User Model
let User = require("../models/user");
const { json } = require("body-parser");

//Add Route
router.get("/", ensureAuthenticated, function (req, res) {
  var gBudget = req.user.budget / 1000;
  gBudget += " M€";

  var footballerIds = req.user.footballers;
  console.log("footballerIds Length = " + footballerIds.length);
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
});

var positions = {
    list: [{"positionId": 0, "position":"All Positions"}]
  };
async function getPositions() {
  
  await Position.find({}).then(function(positionsResult) {
      
    // if (err) {
    //   console.log(err);
    // } else {  
      positions = {
        list: [{"positionId": 0, "position":"All Positions"}]
      }      
      for(var i = 0; i < positionsResult[0].position.length; i++){
        // console.log(positionsResult[0].position[i]);
        // ;
        positions.list.push({ 
          "positionId": (i+1), 
          "position": positionsResult[0].position[i]  
        });
      }
    
  }); 
  
}

var teams = {
  list: [{"teamId": 0,"teamName": "All Teams"}]
};

async function getTeams() {
  
  await Team.find({}, await function(err, teamsResult) {
      
    if (err) {
      console.log(err);
    } else {
      teams = {
        list: [{"teamId": 0,"teamName": "All Teams"}]
      };
      for(var i = 0; i < teamsResult.length; i++){
        teams.list.push({ 
          "teamId" : teamsResult[i].teamId,
          "teamName" : teamsResult[i].teamName        
        });
      }
    }
  });
}

var allFootballers = {
  list: []
};

async function getAllfootballers(tId, pId) {
  console.log("getAllfootballers CALLED tID:" + tId + ", pıd:" + pId);
  var queryJson = {};
  if(tId != "" && tId != 0 && pId != ""){
    queryJson={
      "teamId" : tId,
      "positionText" : pId      
    };
  }
  else if (tId != "" && tId != 0){
    queryJson ={
      "teamId" : tId    
    };
  }
  else if(pId != ""){
    queryJson = {
      "positionText" : pId      
    };
  }

  console.log("QUERY JSON =" + JSON.stringify(queryJson));
  await Footballer.find(queryJson, function(err, allFootballersResult) {
      
    if (err) {
      console.log(err);
    } else {
      allFootballers = {
        list: []
      };
      console.log("ALL FOOTBALLERS INNER-----------");
      console.log(JSON.stringify(allFootballersResult[0]));
      for(var i = 0; i < allFootballersResult.length; i++){
        allFootballers.list.push({ 
          "id"          : allFootballersResult[i].id,
          "name"        : allFootballersResult[i].name,
          "firstName"   : allFootballersResult[i].firstName,
          "lastName"    : allFootballersResult[i].lastName,
          "teamId"      : allFootballersResult[i].teamId,
          "teamName"    : allFootballersResult[i].teamName,
          "playedPositions"    : allFootballersResult[i].playedPositions,
          "positionText"       : allFootballersResult[i].positionText,
          "height"      : allFootballersResult[i].height,
          "weight"      : allFootballersResult[i].weight,
          "age"         : allFootballersResult[i].age,
          "minsPlayed"  : allFootballersResult[i].minsPlayed,
          "rating"      : allFootballersResult[i].rating
        });
      }
    }
  });
}


async function genericArrangeRouter(req, res, tId, pId) {
  var gBudget = req.user.budget / 1000;
  gBudget += " M€";

  await getAllfootballers(tId, pId);
  
  
  // var teams = 
  await getTeams();
  // var positions = 
  await getPositions(); 


  var footballerIds = req.user.footballers;
  
  var currentFootballers = {
    list: []
  };
  
  var fbCnt = footballerIds.length;
  if(!fbCnt){
    console.log("Footballer =" + JSON.stringify(currentFootballers));
    
    res.render("arrange_team", {
      title: req.user.name,
      budget: gBudget,
      teams: teams.list,
      positions: positions.list,
      footballers: allFootballers.list,
      current_footballers: currentFootballers.list
    });
  }
  else{
    for(var i = 0; i < footballerIds.length; i++){
      var fbId = footballerIds[i];
      console.log("fbObj=" + fbId);
      Footballer.findOne({id: fbId}, function(err, result) {
        
        if (err) {
          console.log(err);
        } else {
          currentFootballers.list.push({ 
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
          console.log("Footballer =" + JSON.stringify(currentFootballers));
          res.render("arrange_team", {
            title: req.user.name,
            budget: gBudget,
            teams: teams.list,
            positions: positions.list,
            footballers: allFootballers.list,
            current_footballers: currentFootballers.list
          });
        }
      });
    }
  }
  
}

function getPositionText(pId){
  switch(pId){
    case "1":
      return "Defender";
    case "3":
      return "Goalkeeper";
    case "4":
      return "Midfielder";
    case "2":
      return "Forward"; 
  }
  return "";

}

router.get("/arrange/", ensureAuthenticated, async function (req, res) {
  await genericArrangeRouter(req, res, 0, 0);
});
router.get("/arrange/tId/:tId/pId/:pId", ensureAuthenticated, async function (req, res) {
  var psoitionText = getPositionText(req.params.pId);
  await genericArrangeRouter(req, res, req.params.tId, psoitionText);
});
router.get("/arrange/tId/:tId", ensureAuthenticated, async function (req, res) {
  await genericArrangeRouter(req, res, req.params.tId, 0);
});
router.get("/arrange/pId/:pId", ensureAuthenticated, async function (req, res) {
  var psoitionText = getPositionText(req.params.pId);
  await genericArrangeRouter(req, res, 0, psoitionText);
});

router.get("/add_footballer/fId/:fId", ensureAuthenticated, async function (req, res) {
  var footballerId = req.params.fId;
  console.log("footballerId: " + footballerId);
  console.log("req.user._id: " + req.user._id);
  console.log("req.user.name: " + req.user.name);
  
  await User.update(
    { _id: req.user._id }, 
    { $push: { footballers: footballerId }},
    { upsert: true }
  );
  res.writeHead(302, {
    'Location': '/team/arrange'
  });
  res.end();
  
  
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
