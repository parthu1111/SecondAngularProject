const pool=require('../config/db.config');

createUser=function(data,callback){
    pool.query(
        'insert into user (name,email,password) values (?,?,?)',
        [data.name,data.email,data.password],
        (err,result)=>{
            if(err){
                return callback(err);
            }
            else{
                return callback(null,result);
            }
        }
    );
}

checkNameOrEmailAvailability=function(username,email,callback){

    pool.query(
        'select * from user where `name`=?',
        [username],
        (err,result)=>{
            console.log(err);
            console.log(result.length);
            if(result.length>=1){
                callback("user name is exist");
            }
            else{
                console.log(err);
                pool.query(
                    "select * from user where `email`=?",
                    [email],
                    (err,result1)=>{
                        console.log(result1);
                        if(result1.length>=1){
                            callback("email is already exist");
                        }
                        else{
                            callback(null,"user not presented yet");
                        }
                    }
                )
            }
        }
    );
}

loginUser=function(data,callback){

    pool.query(
        "select * from user where `email`=? limit 1",
        [data.email],
        (err,result)=>{

            if(err){
                callback(err);
            }
            else{
                callback(null,result);
            }
        }
    )
}
module.exports={
    createUser,checkNameOrEmailAvailability,loginUser
}