var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routes = require("./src/routes");
app.use(routes);

var server = app.listen(8081, function () {
    var port = server.address().port;
    console.log("Server running at port %s", port);
});