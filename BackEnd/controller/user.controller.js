const {createUser,checkNameOrEmailAvailability,loginUser} =require('../models/user.model');
const bcrypt = require('bcrypt');
const {sign}=require('jsonwebtoken');
const keyObject=require('../config/auth.config');

signup=function(req,res){

    const body=req.body;
    console.log(body);
    const salt = bcrypt.genSaltSync(10);
    body.password=bcrypt.hashSync(body.password, salt);
    checkNameOrEmailAvailability(body.name,body.email,(err,success)=>{
        if(err){
            console.log(err);
            return res.status(400).send({
                message:err
            })
        }
        else{
            console.log(success);
            createUser(body,(err,result)=>{
                if(err){
                    return res.status(400).send({
                        message:"something went wrong"
                    })
                }
                else{
                    return res.status(200).send({
                        message:"user is created successfully"
                    })
                }
            });
        }
    })
}

login=function(req,res){

    const body=req.body;
    loginUser(body,(err,result)=>{
        if(err){
            console.log(err);
        }
        if(result.length>=1){
            const temp_boolean=bcrypt.compareSync(body.password,result[0].password);
            if(temp_boolean){
                result[0].password=undefined;
                const jsontoken=sign({result:result[0]},keyObject.secret,{
                    expiresIn:"1h"
                });
                return res.status(200).send({
                    success:1,
                    message:"login successfully",
                    token:jsontoken
                })
            }
            else{
                return res.status(400).send({
                    message:"email or password is incorrect"
                })
            }
        }
        else{
            res.status(400).send({
                message:"user doesn't exist"
            })
        }
    })
}

module.exports={
    signup,login
}