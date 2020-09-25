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

//db.select('*').from('users').then(data=>{console.log(data)});


const app=express();
app.use(express.json());

const database={
  users:[
      {
          id:"123",
          name:"john",
          email:"john@email.com",
          password:"cookies",
          entries:0,
          joined: new Date()
      },
      {
        id:"125",
        name:"sally",
        email:"sally@email.com",
        password:"12345",
        entries:0,
        joined: new Date()
    }
  ]
}

app.get('/',(req,res)=>{
    res.send('it is working')
})

app.post('/signin',(req,res)=>{
    if (eq.body.password===database.users[0].password && req.body.email===database.users[0].email){
        res.json('success')}else{
            res.status(400).json('error logging')
        }
})
app.post('/register',(req,res)=>{
    const {email,name,password}=req.body;
    db('users').returning('*').insert({email:email, name:name, joined: new Date()})
    .then(user=>{res.json(user[0]);})  
    .catch(err=>res.status(400).json('no such user',err) )   
})

app.get('/profile/:id',(req,res)=>{
    const {id}=req.params;
    db.select('*').from('users').where({id:id})
    .then(user=>{
        console.log(user[0]);
        return res.json(user[0])
    })
})
app.post('/image',(req,res)=>{
    const {id}=req.body;
    let found=false;
    database.users.forEach(user=>{
      if (user.id===id){
            found=true;
            user.entries++;
            return res.json(user.entries);
      } 
    })
    if(!found){
        res.status(400).json('user not found')
    }        
})

app.listen(3000,()=>{
console.log('app is running')})