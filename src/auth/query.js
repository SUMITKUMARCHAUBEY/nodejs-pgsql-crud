const userById="SELECT * FROM users WHERE id=$1";
const adduser="INSERT INTO users(id,name,password) VALUES($1,$2,$3)";
module.exports={userById,adduser};