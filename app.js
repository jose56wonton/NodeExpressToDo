var express = require('express');
var todoController = require('./controllers/todoController')
var app = express();

// Setup template engine
app.set('view engine', 'ejs');
// Static Files
app.use(express.static('./public'));
// Fire controllers
todoController(app);


// List to port
app.listen(3000);
console.log("Listening to 3000");