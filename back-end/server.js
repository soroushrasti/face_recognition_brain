const express = require('express');
const bodyparser=require('body-parser');
const bycrpt=require('bcrypt-nodejs');

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
    if (bcrypt.compare(req.body.password,database.users[0].password) && req.body.email===database.users[0].email){
        res.json('success')}else{
            res.status(400).json('error logging')
        }
})
app.post('/register',(req,res)=>{
    const {email,name,password}=req.body;
    database.users.push({
        id:"124",
        name:name,
        email:email,
        password:bycrpt.hash(password,null,null,function(err,hash){}),
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
        
})

app.get('/profile/:id',(req,res)=>{
    const {id}=req.param;
    let found=false;
    database.users.forEach(user=>{
        if (user.id===id){
            found=true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('no such user')
    }
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