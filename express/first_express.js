var express = require('express');
var app = express.createServer();

app.get('/', function(req, res){
  res.send("Rock on!");
});

app.get('/products', function(req, res){
  res.send("Rock on products");
});

app.get('/product/:id', function(req, res){
  res.send("Rock on products for id:" + req.params.id);
});

app.get('/services', function(req, res){
  res.send("Rock on services!");
});

app.listen(4444);
