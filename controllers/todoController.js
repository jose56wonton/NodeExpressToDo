var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// Connect to the database
mongoose.connect('mongodb://user:pass@ds121896.mlab.com:21896/todos');

// Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo',todoSchema);



var urlencodedParser = bodyParser.urlencoded({entended:false});
//var todos = [{item: 'get milk'},{item: 'walk dog'},{item: 'kick some coding ass'}];
module.exports = function(app){
  app.get('/todo', function (req, res) {    
    // Get data from mongo and pass to the view
    Todo.find({}, function(err,todos){
      if(err) throw err;
      res.render('todo', { todos });
    })    
  });
  app.post('/todo',urlencodedParser, function (req, res) {
    // Get data from the view and add it to mongoDB
    var temp = Todo(req.body).save(function(err,data){
      if(err)throw err;
      res.json(data);
    })
  });
  app.delete('/todo/:item', function (req, res) {
    // Delete the requested item from mongoDB
    Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,todos){
      if(err) throw err;
      res.json(todos);
    })
  });
};