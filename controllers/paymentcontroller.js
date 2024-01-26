import payment from '../models/paymentmodel.js'
import axios from 'axios'
import dotenv from 'dotenv'
import { validationResult } from 'express-validator';

dotenv.config()

const webhook = async(req, res) => {
  const id = req.body.id

  const paymentResponse = await axios.get(`https://api.mollie.com/v2/payments/${id}`, {
        headers: {
            'Authorization': process.env.MOLLIE_API_KEY,
        }
    });

    const status = paymentResponse.data.status
    const paymentUpdate= {mollie_id:id, status:status};


  if(paymentResponse){
    payment.update(paymentUpdate)
      res.status(200).send({message: 'Ok!'})
  }else{
      res.status(500).send({message: 'Error.'})
  }
}

const createPayment = async(req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const { amount, description, redirectUrl } = req.body;

    const paymentResponse = await axios.post(`${process.env.MOLLIE_API}/payments`, {
        "amount": amount, 
        "description": description,
        "redirectUrl": redirectUrl,
        "webhookUrl": `${process.env.BACKEND_NGROK_PROXY}/payments/webhook`},{
        headers: {
          'Authorization': process.env.MOLLIE_API_KEY,
      }
    });

    const userId = req.userId
    const mollieId = paymentResponse.data.id
    const createdAt = paymentResponse.data.createdAt
    const text = paymentResponse.data.description


    const paymentData = {mollie_id:mollieId, user_id:userId, description:text, createdAt:createdAt, currency: amount.currency, amount:amount.value, status:"open"};
    payment.create(paymentData)

    res.send(paymentResponse.data._links);
} catch (error) {
    // Handle errors properly
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
        res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
        res.status(500).send('No response received');
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
        res.status(500).send(error.message);
    }
}
}
const getPayments = async(req, res) => {
    const userId = req.userId

    if (userId) {
        const paymentList = await payment.get(userId)
        res.status(200).send({payments: paymentList})
      } else {
        res.status(500).send({message: 'Gebruiker bestaat niet.'})
      }
    
}

export default {createPayment, getPayments, webhook}