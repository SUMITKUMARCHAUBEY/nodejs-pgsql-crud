const pool=require('../../db');
const query=require('./query');
const jwt=require('jsonwebtoken');

require('dotenv').config()

const maxage=3*24*60*60;
const createtoken=(id)=>{
    return jwt.sign({id},process.env.SECRET,{
        expiresIn:maxage
    });
}



 const login=(req,res)=>{
    const {id,pass}=req.body;
    pool.query(query.userById,[id],(err,results)=>{
        const nouser= !results.rows.length;
        
       
        
       
        if(nouser){
            res.status(404).send('user not found');
        }
        else{
            if(results.rows[0].password==pass){
                const token = createtoken(results.rows[0].id);
                res.cookie('jwt',token,{httpOnly:true,maxAge:maxage*1000});
                res.send('login successfull');
            }
            else{
              
                res.status(401).send('invalid credencials');
            }
        }
    })
 }
const signup=(req,res)=>{

    const {id,name,pass}=req.body;
    pool.query(query.userById,[id],(err,results)=>{
        const nouser= !results.rows.length;
        
        if(nouser){
            pool.query(query.adduser,[id,name,pass],(err,results)=>{
                if(err){
                    console.log(err);
                }
                else{
                    const token = createtoken(results.rows[0].id);
                    res.cookie('jwt',token,{httpOnly:true,maxAge:maxage*1000});
                    res.status(201).send("user has been created successfully");
                }
            })
        }
        else{
            res.status(401).send('id not available');
        }


})
}



const logout=(req,res)=>{
    
    res.cookie('jwt','',{maxAge:1});
    res.send('you are logged out successfully');
}

 module.exports={login,signup,logout}