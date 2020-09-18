const express = require('express');
const bodyparser=require('body-parser');

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
    if (req.body.password===database.users[0].password && req.body.email===database.users[0].email){
        res.json('success')}else{
            res.status(400).json('error logging')
        }
})


app.listen(3000,()=>{
console.log('app is running')})