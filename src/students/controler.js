const pool=require('../../db');
const getstudents=require('./quries')

const getstu =(req,res)=>{
   pool.query(getstudents.getstudents,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.status(200).json(result.rows)
        }
   })
};
const getstuById=(req,res)=>{
    const id=parseInt(req.params.id);
    pool.query(getstudents.getstuById,[id],(err,results)=>{
        if(err){
            console.log(err);
        }
        else{
            res.status(200).json(results.rows);
        }
    })
}

const addstud=(req,res)=>{
    const {name,age,dob}=req.body;

    pool.query(getstudents.nameexist,[name],(err,results)=>{
        if(results.rows.length){
            res.send("email already exists");
        }
        else{
            pool.query(getstudents.addstudent,[name,age,dob],(err,results)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.status(201).send("student has been created successfully");
                }
            })
        }
    })

}

const delstdById=(req,res)=>{
    const id= parseInt(req.params.id);
    pool.query(getstudents.getstuById,[id],(err,results)=>{
        
        const nostd= !results.rows.length;
        
        if(nostd){
            res.send("student does not exist,could not delete.");
        }
        else{
            pool.query(getstudents.delstdById,[id],(err,results)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.send("student deleted successfully");
                }

            })
        }
    })



}
const updatstdById=(req,res)=>{
   
    const id= parseInt(req.params.id);
    const {name,age,dob}=req.body;

    pool.query(getstudents.getstuById,[id],(err,results)=>
    {
        const nostd= !results.rows.length;
        if(nostd){
            res.send("no such student exists,cannot update");
        }
        else{
            pool.query(getstudents.updatstd,[ name , age, dob, id],(err,results)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.status(200).send("student updated successfully");
                }
            });
        }

    })
}



module.exports={getstu,getstuById,addstud,delstdById,updatstdById};