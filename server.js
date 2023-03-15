const express= require('express');
const app=express();
 const port=3000;
 const cookieParser =require('cookie-parser');
 app.use(express.json());
 
 app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('hello world!');

})

app.use('/api/auth/user/',require('./src/auth/routes'))

app.use('/api/vi/students',require('./src/students/routes'))

 app.listen(3000,()=>{
    console.log('port listening at 3000');
 })