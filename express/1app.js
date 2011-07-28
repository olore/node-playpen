var express = require('express');
var app = express.createServer();
var orm = require('FastLegS');

app.get('/user/:id', function(req, res){

  var connectionParams = {
    user: 'postgres',
    database: 'node',
    host: 'localhost',
    port: 5432
  }

  orm.connect(connectionParams);
  var User = orm.Base.extend({tableName: 'users', primaryKey: 'id'});
  var params = { id: req.params.id };

  User.findOne(params, function(err, user) {
    if (err) {
      res.send("ERROR! " + JSON.stringify(err));
    } else {
      res.send("You just looked up " + JSON.stringify(user));
    }
  });

});


app.listen(4444);
