var express = require('express');
var router = express.Router();
var mongojs=require("mongojs");
var db=mongojs('todoistdb', ['todos']);




//get all todos
router.get('/todos', function(req, res, next){
    db.todos.find(function(err, data){
    	if(err){
    		res.send(err)
    	}

    	else{
    		res.json(data)
    	}
    })
});


//find all todos
router.get('/todos/:title', function(req, res, next){
	
	var title=req.params.title;
	db.todos.find({title:title}, function(err, data){
    	if(err){
    		res.send(err)
    	}

    	else{
    		res.json(data)
    	}
    })
});

//get single todo

router.get('/todos/:id', function(req, res, next){

	var id=mongojs.ObjectId(req.params.id);

	db.todos.findOne({_id:id}, function(err, data){
		if(err){
			res.send(err)
		}

		else{
			res.json(data);
		}
	})
});


//save a todo
router.post('/todo', function(req, res , next){

	var newTodo=req.body;
	if(!newTodo.title){
		res.status(400);
		res.json({
			"error": "Invalid Data"
		});
	}

	else{
		db.todos.insert(newTodo, function(err, data){
			if(err){
				res.send(err)
			}

			else{
				res.send(data);
			}
		})
	}


});

//update a todo

router.put('/todos/:id', function(req, res, next){
	var todo=req.body;
	var id=mongojs.ObjectId(req.params.id);
	var updatedTodo={};

	updatedTodo.title=todo.title;
	updatedTodo.isDone=todo.isDone;	

	db.todos.update({_id:id}, updatedTodo, {}, function(err, data){
		if(err){
			res.send(err)
		}

		else{
			res.json(data);
		}
	})

})

//delete a todo
router.delete('/todos/:id', function(req, res, next){
 db.todos.remove({
        _id:mongojs.ObjectId(req.params.id)
    }, function(err, result){

        if(err){
            res.send(err);
        }

        else {
            res.json(result);
        }
    });
});

module.exports = router;