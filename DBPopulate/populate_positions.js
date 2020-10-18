var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost/ff_db";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function app() {

    var db =  await MongoClient.connect(url);
    var cursor = await db.collection("latest_footballers").distinct("positionText");
    for(var i = 0; i < cursor.length; i++) {
        
        console.log(cursor);

        db.collection("positions").update(
            { position: cursor },
            {
                position: cursor              
            },
            { upsert: true }
          );
    }
}

app();