var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost/ff_db";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function app() {

  MongoClient.connect(url, function (err, db) {
    var cursor = db.collection("latest_footballers").find();
    var cnt = 0;
    cursor.each(function (err, doc) {
      if (doc != null) {
        db.collection("calculated_footballers").update(
          { id: doc.playerId },
          {
            id: doc.playerId,
            name: doc.name,
            firstName: doc.firstName,
            lastName: doc.lastName,
            teamId: doc.teamId,
            teamName: doc.teamName,
            playedPositions: doc.playedPositions,
            height: doc.height,
            weight: doc.weight,
            age: doc.age,
            positionText: doc.positionText,
            
          },
          { upsert: true }
        );
      } else {
        console.log(cnt + " entries has been updated");
        return;
      }

      //console.log(doc);
    });
    
    sleep(2000);

    var cnt2 = 0;
    var cursor2 = db.collection("latest_footballers").find();
    cursor2.forEach(function (latestFbDoc) {
      sleep(200);
      if (latestFbDoc != null) {
        db.collection("footballers").findOne(
          { playerId: latestFbDoc.playerId },
          function (err, prevFbDoc) {
            var calcRatingWeekly = 0;
            var minsPlayedWeekly = 0;

            if (err) throw err;
            if (prevFbDoc != null) {
              if (prevFbDoc.apps + 1 == latestFbDoc.apps) {
                var prevRatingTotal = prevFbDoc.rating * prevFbDoc.apps;
                var currRatingTotal = latestFbDoc.rating * latestFbDoc.apps;

                calcRatingWeekly = currRatingTotal - prevRatingTotal;
                minsPlayedWeekly = latestFbDoc.minsPlayed - prevFbDoc.minsPlayed;
                console.log(
                  prevFbDoc.name +
                    " weekly rating is: " +
                    calcRatingWeekly +
                    ", minsPlayedWeekly is: " +
                    minsPlayedWeekly
                );
              } else if (prevFbDoc.apps == latestFbDoc.apps) {
                console.log(prevFbDoc.name + " has not been played this week");
              } else {
                console.log(prevFbDoc.name + " apps are problematic!!");
              }
            } else {
              calcRatingWeekly = latestFbDoc.rating;
              minsPlayedWeekly = latestFbDoc.minsPlayed;
              console.log(
                latestFbDoc.name +
                  " has not been found for previous week. Weekly rating is: " +
                  calcRatingWeekly +
                  ", minsPlayedWeekly is: " +
                  minsPlayedWeekly
              );
            }

            db.collection("calculated_footballers").update(
              { id: latestFbDoc.playerId },
              {
                $set: {
                  rating: calcRatingWeekly,
                  minsPlayed: minsPlayedWeekly,
                },
              }
            );
            cnt2++;
          }
        );
      } else {
        console.log(cnt2 + " rating has been calculated");
        return;
      }
    });
  });
}

app();