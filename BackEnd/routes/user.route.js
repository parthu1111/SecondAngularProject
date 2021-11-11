const {signup, login} =require('../controller/user.controller');
const router=require('express').Router();

router.post('/signup',signup);
router.post('/login',login);

module.exports=router;