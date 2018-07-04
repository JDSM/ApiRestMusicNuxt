const express = require('express');
const router = express.Router();

const TopMusic = require('../models/topmusic');
//get data
router.get('/', (req, res) => {
  //  TopMusic.find(function (err, topmusics){
    TopMusic.aggregate([
        { $group: {
            _id:{musicName: "$musicName", artistName: "$artistName"},
            "resul":{$sum:1}, 
            "promedio":{$avg:"$vote"}, 
            musicName:{$first:"$musicName"},
            img:{$first:"$urlImg"}, 
            artistName:{$first:"$artistName"} 
        }},{$sort : { promedio:-1 }},{ $limit : 10 }, {$project:{_id:0}}], function (err, topmusics){
        if (err) {throw err;}
        else {
            res.json(topmusics);
            //TopMusic.aggregate( [ { $group: { _id:{$and:[{artistName},{$musicName}] }} } ] );
            
        }
    })
});
//get id
router.get('/:id', (req, res, next) =>{
    TopMusic.findById(req.params.id, function (err, use){
         res.json(use);  
    })
});
//add data
router.post('/', (req, res) =>{
    const topmusic = new TopMusic(req.body);
    console.log(req.body);
    topmusic.save()
    .then(topmusic =>{
        res.status(200).json({topmusic: 'Voto Guardado'});
    })
    .catch (err =>{
        console.log(err);
        res.status(400), send({topmusic: 'Error al Agregar'});
    });
 });
 // update
 router.put('/:id', (req, res, next) =>{
     TopMusic.findById(req.params.id, function (err, tms){
         if (!tms){
             return next(new Error('No se pudo actualizar'));
         } else {
             tms.name= req.body.name;
             tms.lastName= req.body.lastName;
             tms.save()
             .then(tms =>{
                 res.json('Usuario Actualizado');
             })
             .catch (err =>{
                 res.status(400), send('Error al Actualizar');
             });
         }
     })
 });
 router.delete('/:id', (req, res, next) => {
     TopMusic.findByIdAndRemove(req.params.id, function (err, tms){
         if (err) {res.json(err);}
         else {res.json('Usuario Eliminado Correctamente');}
     })
 });
module.exports = router;