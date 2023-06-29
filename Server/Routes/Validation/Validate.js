const {check}=require('express-validator')

module.exports.SignUpValidate=[check('name','username is required').not().isEmpty(),check('email','Email is invalid').isEmail(),check('password','Password must be have length of atleast 6 characters').isLength({min:6})] 
module.exports.LoginValidate=[check('email','Email is invalid').isEmail(),check('password','Password is incorrect or empty').isLength({min:6})]