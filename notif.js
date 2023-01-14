const express = require('express');
const app = express();
const mongoose = require('mongoose');
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
app.get("/notifs/ping", (req,res) =>{
    res.status(200).json({message:'pong'});
});


app.get("/notifs/:id_user", (req,res)=>{
    var id_user = req.params.id_user;
    console.log(id_user)
    db.notifs.find({id_user:id_user}).then((e)=>{
            res.status(200).json(e);
        }).catch(()=>{
            res.status(404).json({message: 'no notifs found'});
        })
});

app.post("/notifs/send", (req,res)=>{
    console.log(req.body)
    var newNotif = new Object()
    if('route' in req.body){
        var newNotif = {
            id_user: req.body.id_user,
            message:req.body.message,
            date:req.body.date,
            route:req.body.route,
            seen: false
        }
    }
    else{
        var newNotif = {
            id_user: req.body.id_user,
            message:req.body.message,
            date:req.body.date,
            seen: false
        }
    }

    db.notifs.find({id_user:req.body.id_user}).then((item)=>{
        if(item.length>=5){
            console.log("suppression d'un item")
            db.notifs.deleteOne({id_user:req.body.id_user}).then(()=>{
                console.log("Blog deleted")
            })
        }
    })
    //sensors.push(newSensor);
    db.notifs.insertMany(newNotif)

    res.status(200).json({message:`la notif a bien été envoyée a l'user: ${newNotif.id_user}`})
    //console.log(items)

    
});



app.listen(3001, ()=>{
    console.log('server is running on port 3001.')
});