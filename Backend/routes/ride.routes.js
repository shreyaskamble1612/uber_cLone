const express = require('express')
const router = express.Router();
const { body } = require('express-validator');
router.post('/create',
    body('userId').isString().isLength({min:24,max:24}).withMessage('Invalid User Id'),
    body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup Address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid Destination Address'),
 )



 module.exports = router;