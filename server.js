var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.get('/page', function(req, res){
    res.sendfile(__dirname + '/page.html');
});

app.listen(8000);