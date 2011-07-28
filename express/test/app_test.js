var testHelper = require('./helpers/test_helper.js');
var app = require('../myapp').app;
var assert = require('assert');

var nodemock = require("nodemock");
var testCase = require("nodeunit").testCase;
var testPort = 9999;


module.exports = testCase({

  setUp: function (callback) {
    app.listen(testPort);
      this.requestParams = {
        host: 'localhost'
      , port: testPort
      , method: 'GET'
      , body: ''
      , headers: {
          contentType: 'application/json'
      }
    };
    callback();
  },

  tearDown: function (callback) {
    app.close();
    callback();
  },

  'should return 404 on bad uri': function (test) {
    test.expect(1); 
    this.requestParams.uri = '/some_wrong_uri';

    testHelper.makeRequest(this.requestParams, function(response) {
      test.equals(response.statusCode, 404);

      test.done();
    });
  },

  'should return Ash': function (test) {
    test.expect(3);
    this.requestParams.uri = '/user/100';

    testHelper.makeRequest(this.requestParams, function(response) {
      test.equals(response.statusCode, 200);

      var data = JSON.parse(response.body);
      test.equals(data.name, "Ash");
      test.equals(data.id, 100);

      test.done();
    });
  }

});
