const Pool= require('pg').Pool;
 
const pool=new Pool({
    user:'postgres',
    host:'localhost',
    password:'123456789',
    database:'students',
    port:5432,

    });

    
    module.exports=pool;
    