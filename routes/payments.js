import paymentcontroller from '../controllers/paymentcontroller.js'
import express from 'express';
import dotenv from 'dotenv'
import { body, check, validationResult } from 'express-validator';

dotenv.config()
const router = express.Router();

router.route('/getpayments')
.get(paymentcontroller.getPayments)

router.route('/webhook')
.post(paymentcontroller.webhook)

router.post('/payment',
    [body('description').isString().withMessage('Description must be a string!').isLength({ min: 1, max: 50 }).withMessage('Description must be between 1 and 50 characters!'), 
    body('amount.value').isFloat({ min: 10, max: 100 }).withMessage('Amount value must be between 10 and 100!').matches(/^\d+\.\d{2}$/).withMessage('Amount must have two decimals!')], 
    paymentcontroller.createPayment)
   

export default router;
