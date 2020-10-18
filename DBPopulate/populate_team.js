var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost/ff_db";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function app() {

    var db =  await MongoClient.connect(url);
    var cursor = await db.collection("latest_footballers").distinct("teamId");
    for(var i = 0; i < cursor.length; i++) {
        var team = await db.collection("latest_footballers").findOne({ teamId: cursor[i] });

        console.log(team.teamId + ":"+team.teamName);

        db.collection("teams").update(
            { teamId: team.teamId },
            {
              teamId: team.teamId,
              teamName: team.teamName              
            },
            { upsert: true }
          );
    }
}

app();