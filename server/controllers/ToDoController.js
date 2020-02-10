
const todoDB = require('../models').ToDo;
class ToDoController{
  
    //insert into database
    static create = (req, res) => {
      if (!req.body.title || !req.body.description || !req.body.due_date ) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

    const userid = req.decoded.id;
    console.log(userid);
          // Create a ToDO
    const todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status ? req.body.status : false,
        due_date: req.body.due_date,
        userId:userid
      };

    todoDB.create(todo)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err=>{
      res.status(500).send({
        message :
        err.message || "some error occured"
      });  
    })
    }

    //get all todo
    static findAll = (req, res, next) => {
        
        const userid = req.decoded.id ? req.decoded.id : '';
        var condition = { userId: userid };
    
        todoDB.findAll({ where: condition })
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => next(err));
    };

    //find one todo
  static findOne = (req, res, next) => {
    const id = req.params.id;

    todoDB.findByPk(id)
    .then(data => {
      if(data){
        res.status(200).send(data);
      } else {
        throw {status: 404, message: "ToDo tidak ditemukan"}
      }
    })
    .catch(err => {
      next(err.message)
    })
  };

  static updateOne = (req, res, next) => {
    if (!req.body.title || !req.body.description || !req.body.due_date ) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const id = req.params.id;
    todoDB.update(req.body, {
      where :{id:id}
    })
    .then( num => {
      if(num == 1){
        todoDB.findByPk(id)
        .then(data => {
          res.status(200).send(data);
        })
      } else {
        res.status(404).send({
          message: `Cannot update Todo with id=${id}. Maybe ToDO was not found or req.body is empty!`
        });
      }
    }
    )
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    })
  };

  static deleteOne = (req, res, next) => {
    const id = req.params.id;

    todoDB.destroy(
      {where : {id : id}
    })
    .then(num => {
      if(num ==1) {
        res.status(200).send(
          {
            message : `Todo with id=${id} was deleted`
          });
      } else {
        res.status(404).send({
          message: `Cannot delete Todo with id=${id}. Maybe ToDO was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting ToDO with id=" + id
      });
    })
  };

  static deleteAll = (req, res) => {
    todoDB.destroy({
      where: {},
      truncate: true
    })
    .then(res.status(200).send(
      {
        message : `Todo were deleted`
      }))
    .catch(err => {
      res.status(500).send({
        message: "Error deleting ToDO with"
      });})
  }
}

module.exports = ToDoController