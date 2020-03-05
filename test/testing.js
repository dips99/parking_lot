/* global describe, it, before */

var server = require('../app.js');
var assert = require('chai').assert;
var fs = require('fs');



let Config = require('../config/config.js');
let configObj = new Config();
let port = configObj.port;

var utils = require("../config/utils.js");

var commands = [];
var totalParkings;
var parkingArr = [];

describe('server', function () {
  before(function () {
    server.listen(port);
  });

  after(function () {
    server.close();
  });
});

describe('File reading test', function() {
  it('Read test input', function(done) {
    fs.readFile('./bin/parking_lot file_inputs.txt', 'utf-8', function(err, data) {
      if (err) {
            console.log(err);
        throw "Unable to read file";
      }
      commands = JSON.parse(JSON.stringify(data)).split("\n");
      done();
    });
  });

  it('Checking Commands', function(done) {
        assert.equal(commands[0].split(" ")[0],"create_parking_lot");
        assert.equal(commands[1].split(" ")[0],"park");
        assert.equal(commands[7].split(" ")[0],"leave");
        assert.equal(commands[8],"status");
        done();
  });
});


describe('create_parking_lot 6', async function () { 
      it('should create 6 parking slots', async function (done) {
            totalParkings = utils.create_parking_lot(commands[0]);
            for(var i=0; i < totalParkings; i++){
                var obj = new Object();
                obj[parseInt(i)] = null;
                parkingArr.push(obj);
            }
            assert.equal(totalParkings,6);
            assert.equal(parkingArr.length,6);
            done();
    
      });
});


describe('park KA-01-HH-1234', async function () {
      it('should park the car', async function (done) {
            var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[1]);
            assert.equal(ele, 1, 'these numbers are equal');
            done();
    
      });
});

describe('park KA-01-HH-9999', async function () {
      it('should park the car', async function (done) {
            var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[2]);
            assert.equal(ele, 2, 'these numbers are equal');
            done();
      });
});

describe('park KA-01-BB-0001', async function () {
      it('should park the car', async function (done) {
            var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[3]);
            assert.equal(ele, 3, 'these numbers are equal');
            done();
    
      });
});

describe('park KA-01-HH-7777', async function () {
      it('should park the car', async function (done) {
            var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[4]);
            assert.equal(ele, 4, 'these numbers are equal');
            done();
    
      });
});

describe('park KA-01-HH-2701', async function () {
      it('should park the car', async function (done) {
            var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[5]);
            assert.equal(ele, 5, 'these numbers are equal');
            done();
    
      });
});

describe('park KA-01-HH-3141', async function () {
      it('should park the car', async function (done) {
            var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[6]);
            assert.equal(ele, 6, 'these numbers are equal');
            done();
    
      });
});

describe('leave KA-01-HH-3141 4', async function () {
      it('Leaving from slot 4', async function (done) {
            var ele = utils.leave(totalParkings, parkingArr, commands[7]);
            assert.equal(ele,4);
            done();
      });
});

describe('status', async function () {
      it('Checking status', function(done) {
            var ele = utils.status(totalParkings, parkingArr);
            assert.equal(ele.length,6);
            done();
      });
});

describe('park KA-01-P-333', async function () {
      it('should park the car', async function (done) {
            var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[9]);
            assert.equal(ele, 9, 'these numbers are equal');
            done();
    
      });
});

describe('park DL-12-AA-9999', async function () {
      it('should park the car', async function (done) {
            var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[10]);
            assert.equal(ele, 10, 'these numbers are equal');
            done();
    
      });
});

describe('leave KA-01-HH-1234 4', async function () {
      it('Leaving from slot 4', async function (done) {
            var ele = utils.leave(totalParkings, parkingArr, commands[11]);
            assert.equal(ele,11);
            done();
      });
});

describe('leave KA-01-BB-0001 6', async function () {
      it('Leaving from slot 6', async function (done) {
            var ele = utils.leave(totalParkings, parkingArr, commands[12]);
            assert.equal(ele,12);
            done();
      });
});


describe('leave DL-12-AA-9999 2', async function () {
      it('Leaving from slot 6', async function (done) {
            var ele = utils.leave(totalParkings, parkingArr, commands[13]);
            assert.equal(ele,13);
            done();
      });
});

describe('park KA-09-HH-0987', async function () {
      it('should park the car', async function (done) {
            var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[14]);
            assert.equal(ele, 14, 'these numbers are equal');
            done();
    
      });
});

describe('CA-09-IO-1111', async function () {
      it('should park the car', async function (done) {
            var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[15]);
            assert.equal(ele, 15, 'these numbers are equal');
            done();
    
      });
});

describe('park KA-09-HH-0123', async function () {
      it('should park the car', async function (done) {
            var ele = utils.park(totalParkings, parkingArr, parkingArr.length, commands[16]);
            assert.equal(ele, 16, 'these numbers are equal');
            done();
    
      });
});

describe('status', async function () {
      it('Checking status', function(done) {
            var ele = utils.status(totalParkings, parkingArr);
            assert.equal(ele.length,17);
            done();
      });
});