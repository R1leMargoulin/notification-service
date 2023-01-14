const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { items, menus } = require('./models');
const cors = require('cors')

require('dotenv').config();

app.use(express.json());
app.use(cors())

//connection
const db = require('./models');

db.mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('connexion sucess')
}).catch(err =>{
    console.log('connexion error')
    process.exit()
})


//routes
app.get("/ping", (req,res) =>{
    res.status(200).json({message:'pong'});
});


app.get("/notifs/:id_user", (req,res)=>{
    var id_user = req.params.id_user;
    db.notifs.find({id:id_user}).then((e)=>{
            res.status(200).json(e);
        }).catch(()=>{
            res.status(404).json({message: 'no notifs found'});
        })
});

app.post("notifs/send", (req,res)=>{
    console.log(req.body)
    var newNotif = new Object()
    if('route' in req.body){
        var newNotif = {
            id_user: req.body.id_user,
            message:req.body.message,
            date:req.body.date,
            route:req.body.route
        }
    }
    else{
        var newNotif = {
            id_user: req.body.id_user,
            message:req.body.message,
            date:req.body.date,
        }
    }
        //sensors.push(newSensor);
        db.items.insertMany(newNotif)
        res.status(200).json({message:`l'id ${newNotif.id} a bien été ajouté`})
        //console.log(items)

    
});



app.listen(3001, ()=>{
    console.log('server is running on port 3000.')
});