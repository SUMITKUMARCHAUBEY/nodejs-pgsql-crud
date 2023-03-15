const getstudents= "SELECT * FROM students";

const getstuById="SELECT * FROM students WHERE id=$1";
const nameexist="SELECT s FROM students s WHERE s.name=$1"
const addstudent="INSERT INTO students(name,age,dob) VALUES($1,$2,$3)";
const delstdById="DELETE FROM students WHERE id = $1 ";
const updatstd="UPDATE students SET name=$1,age=$2,dob=$3 WHERE id=$4";


module.exports= {
    getstudents,
    getstuById,
    nameexist,
    addstudent,
    delstdById,
    updatstd,
};