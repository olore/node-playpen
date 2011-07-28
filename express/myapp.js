var express = require('express');
exports.app = express.createServer();
var orm = require('FastLegS');

exports.app.configure(function() {
  var connectionParams = {
    user:     'postgres',
    database: 'node',
    host:     'localhost',
    port:     5432
  }
  orm.connect(connectionParams);
  //TODO: gah I don't want this to be global
  User = orm.Base.extend({tableName: 'users', primaryKey: 'id'});
});


function find_user_by_id(user_id, callback) {
  var params = { id: user_id };
  User.findOne(params, function(err, user) {
    callback(err, user);
  });
}


exports.app.get('/user/:id', function(req, res){
  find_user_by_id(req.params.id, function(err, user) {
    if (err) {
      res.send("ERROR! " + JSON.stringify(err));
    } else {
      res.send(JSON.stringify(user));
    }
  });
});


//app.listen(4444);



