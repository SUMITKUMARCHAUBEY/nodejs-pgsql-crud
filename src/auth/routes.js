const {Router}=require('express');
const router=Router();
const controler=require('./controler')



router.post('/login',controler.login);
router.post('/signup',controler.signup);
router.get('/logout',controler.logout);




module.exports=router;