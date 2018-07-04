const express = require('express');
const router = express.Router();

const User = require('../models/user');

//get data
router.get('/', (req, res) => {
    User.find(function (err, users){
        if (err) {throw err;}
        else {
            res.json(users);
        }
    })
});
//get id
router.get('/:id', (req, res, next) =>{
    q=req.params.id.split("-");
    console.log(q[1]);
    console.log(q[0]);
    if(q[0].length>5){
        User.findById(req.params.id, function (err, use){
            res.json(use);  
        })
    }
    else{
        User.findOne({$and: [{password:q[0]},{name:q[1]}]}, function (err, use){
            res.json(use);  
            console.log(res.use);
       })
    }
});
//add data
router.post('/', (req, res) =>{
    const user = new User(req.body);
    user.save()
    .then(user =>{
        res.status(200).json({user: 'Usuario Agregado Correctamente'});
    })
    .catch (err =>{
        res.status(400), send({user: 'Error al Agregar'});
    });
 });
 // update
 router.put('/:id', (req, res, next) =>{
     User.findById(req.params.id, function (err, user){
         if (!user){
             return next(new Error('No se pudo actualizar'));
         } else {
             user.name= req.body.name;
             user.lastName= req.body.lastName;
             user.save()
             .then(user =>{
                 res.json('Usuario Actualizado');
             })
             .catch (err =>{
                 res.status(400), send('Error al Actualizar');
             });
         }
     })
 });
 router.delete('/:id', (req, res, next) => {
     User.findByIdAndRemove(req.params.id, function (err, user){
         if (err) {res.json(err);}
         else {res.json('Usuario Eliminado Correctamente');}
     })
 });
module.exports = router;