const handleRegister=(req,res,db,bycrpt)=>{
    const {email,name,password}=req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect form submission')
    }
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
}

module.exports={
    handleRegister:handleRegister
}