var express = require('express');
var app = express.createServer();
var orm = require('FastLegS');

app.configure(function() {
  var connectionParams = {
    user: 'postgres',
    database: 'node',
    host: 'localhost',
    port: 5432
  }
  orm.connect(connectionParams);
  //TODO: gah I don't want this to be global
  User = orm.Base.extend({tableName: 'users', primaryKey: 'id'});
});


function fetch_user(user_id, callback) {
  var params = { id: user_id };
  User.findOne(params, function(err, user) {
    callback(err, user);
  });
}


app.get('/user/:id', function(req, res){
  fetch_user(req.params.id, function(err, user) {
    if (err) {
      res.send("ERROR! " + JSON.stringify(err));
    } else {
      res.send("You just looked up " + JSON.stringify(user));
    }
  });
});




app.listen(4444);



