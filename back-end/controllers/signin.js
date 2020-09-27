const handleSignin=(req,res,db,bycrpt)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json('incorrect submission')
    }
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
}

module.exports={
    handleSignin:handleSignin
}