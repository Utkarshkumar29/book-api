const express=require('express')
const router=express.Router()
const {RegisterUser,LoginUser}=require('../controllers/userControllers')

router.route('/registerUser').post(RegisterUser)
router.route('/loginUser').post(LoginUser)

module.exports = router