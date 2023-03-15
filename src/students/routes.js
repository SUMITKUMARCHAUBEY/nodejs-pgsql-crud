const {Router}=require ('express');
require('dotenv').config();
const router= Router();
const controler=require('./controler');

const jwt=require('jsonwebtoken');


const auth= (req,res,next)=>{
    const token=req.cookies.jwt;

    if(token){
        jwt.verify(token,process.env.SECRET,(err,decode)=>{
            if(err){
                console.log(err);
                res.send('invalid token please login again');
            }
            else{
               console.log(decode);
               next();
            }
        })
    }
    else{
        res.send('invalid token please login again');
    }
}


router.get('/',auth,controler.getstu);
router.get("/:id",auth,controler.getstuById);
router.post("/",auth,controler.addstud);
router.delete("/:id",auth,controler.delstdById)
router.put("/:id",auth,controler.updatstdById);

module.exports=router;