//load http module
const http = require("http");
const fs = require("fs");
var elements = process.argv;
const rl = require("readline");

let Config = require("./config/config.js");
let configObj = new Config();
let hostname = configObj.hostname;
let port = configObj.port;

var utils = require("./config/utils.js");

let totalParkings = 0;
let parkingArr = [];

var interact = async () => {
  if (elements[elements.length - 1] == "true") {
    var prompts = await rl.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    prompts.question("Input: ", function(data) {
      commands(data);
    });
  }
};
if (elements[elements.length - 1] == "true") {
  interact();
} else {
  fs.readFile(elements[2], "utf-8", function(err, data) {
    var arr = data.split("\n");
    for (var i = 0; i < arr.length; i++) {
      commands(arr[i]);
    }
  });
}

var commands = async input => {
  var n = input.split(" ")[0];
  switch (n) {
    case "create_parking_lot":
      totalParkings = await utils.create_parking_lot(input);
      try {
        maxSize = parseInt(totalParkings);
        for (var i = 0; i < maxSize; i++) {
          var obj = new Object();
          obj[parseInt(i)] = null;
          parkingArr.push(obj);
        }
        console.log("Created a parking lot with " + maxSize + " slots.");
      } catch (e) {
        return "Parameter is not a number!";
      }

      break;
    case "park":
      var len = parkingArr.length;
      var slotNumber = await utils.park(totalParkings, parkingArr, len, input);
      if (slotNumber) {
        console.log("Allocated slot number: " + slotNumber);
      } else {
        console.log("Sorry, parking lot is full");
      }
      break;
    case "leave":
      var leftCharges = await utils.leave(totalParkings, parkingArr, input);
      if (Array.isArray(leftCharges)) {
        if (leftCharges["match"] == 0) {
          console.log(
            "Registration number " + leftCharges["car"] + " not found"
          );
        } else {
          console.log(
            "Registration number " +
              leftCharges["car"] +
              " with Slot Number " +
              leftCharges["slot"] +
              " is free with Charge " +
              leftCharges["charge"]
          );
        }
      } else {
        console.log("Please enter total hours car was parked");
      }

      break;
    case "status":
      var values = await utils.status(totalParkings, parkingArr);
      if (values.length > 1) {
        console.log(values.join("\n"));
      } else {
        console.log("Sorry, parking lot is full");
      }
      break;
  }
  interact();
};

//create nodejs http server that will listen to port given in config
http
  .createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Node Http server");
  })
  .listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
