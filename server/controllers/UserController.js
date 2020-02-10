const User =  require('../models').User;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

class UserController{
    //register
    static register = (req, res) => {
        if (!req.body.username) {
            res.status(400).send({
              message: "Username can not be empty!"
            });
            return;
          }
          else if (!req.body.password) {
            res.status(400).send({
              message: "Password can not be empty!"
            });
            return;
        }
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);

        const user = {
            username : req.body.username,
            password : hashedPassword,
            email : req.body.email
        }

        User.create(user)
        .then(data => {
          res.status(201).send(data);
        })
        .catch(err => {
            res.status(400).send({
                message : err.message
            })
        })
    }

    //sign in
    static signin = (req, res) => {
      var username = req.body.username;
      var password = req.body.password;
      if (!username) {
          res.status(400).send({
            message: "Username can not be empty!"
          });
          return;
        }
        else if (!password) {
          res.status(400).send({
            message: "Password can not be empty!"
          });
          return;
      }
      User.findOne(
        {
          where: {
            username: username
          }
      })
      .then(data => {
        if(data) {
          var passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
          console.log(passwordIsValid);
          if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
          var token = jwt.sign({ id: data.id }, 'secret', {
            expiresIn: 86400, // expires in 24 hours
            issuer: 'seven'
          });
          console.log(token);
          res.status(200).send({accessToken: token, username:data.username });
        } else {
          res.status(404).send({ message : "user not found" });
        }
      })
      .catch(err => {
        res.send(err.message);
      })

    }

    static findAll = (req, res, next) => {
      const username = req.query.username;
          var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;
          User.findAll({ where: condition })
          .then(data => {
            res.status(200).send(data);
          })
          .catch(err => next(err));
    }
}
module.exports = UserController