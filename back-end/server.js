const express = require('express');
const bycrpt=require('bcrypt-nodejs');
const cors= require('cors');
const knex=require('knex');

const db= knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:'soroushrasti',
        database:'smart-brain'
    }
});


const app=express();
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('it is working')
})

app.post('/signin',(req,res)=>{
     db.select('email','hash')
     .from('login')
     .where('email','=',req.body.email)
     .then(data=>{
         const isvalid= bycrpt.compareSync(req.body.password,data[0].hash);
         if (isvalid){
           return db.select('*').from('users')
           .where('email','=',req.body.email)
           .then(user=>{
               res.json(user[0]);
           })
           .catch(err=>res.status(400).json('unable to get user') )
         }else{
            res.status(400).json('wrong credential') 
         }
     })
})

app.post('/register',(req,res)=>{
    const {email,name,password}=req.body;
    const hash=bycrpt.hashSync(password);
    db.transaction(trx=>{
        trx.insert({hash:hash,email:email})
        .into('login')
        .returning('email')
        .then(logInemail=>{
             return trx('users').returning('*').insert({
                email:logInemail[0],name:name,joined: new Date()
            })
            .then(user=>{  res.json(user[0]); }) })
        .then(trx.commit)
        .catch(trx.rollback ) 
        })
    .catch(err=>res.status(400).json('unable to register') )
  
})

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    db.select('*').from('users').where({id:id})
    .then(user=>{
        if (user.length){
            return res.json(user[0])
        }else{
           return res.status(400).json('not found')
        }
        
    })
    .catch(err=>res.status(400).json('not found') )
})
app.put('/image',(req,res)=>{
    const {id}=req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then (entries=>{
        return res.json(entries[0]);
    })
    .catch(err=>res.status(400).json('unable to get entries') )
})

app.listen(3000,()=>{
console.log('app is running')})