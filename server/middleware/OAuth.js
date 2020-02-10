const jwt = require('jsonwebtoken')
const User = require('../models').User
const ToDo = require('../models').ToDo

class OAuth {
    static authenticate = (req, res, next) => {
        const authorizationHeaader = req.headers.authorization;
        if (!authorizationHeaader) 
        {
            res.status(401).send({
                error: `Authentication error. Token required.`,
                status: 401
            });
        } else {
            const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
            const options = {
                expiresIn: 86400,
                issuer: 'seven'
            };
            try{
                var result = jwt.verify(token, 'secret', options);
                if(result){
                    req.decoded = result;
                    next();
                }
            }catch(err)
            {
                res.send(err);
            }
        }
    }

    static authorizeToDo = (req, res, next) => {
        const userId =  req.decoded.id;
        const todoId = req.params.id;
        console.log(todoId);

        ToDo.findByPk(todoId)
        .then(data => {
            if(!data){
                res.status(404).send({ message: 'To Do not found' })
            }else if(data.userId == userId) {
                next()
            } else {
                res.status(403).send({message: 'You are not authorized'})
            }
        })
        .catch(err => {
            res.send(err.message)
        })

    }
}

module.exports = OAuth;