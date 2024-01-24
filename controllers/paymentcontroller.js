import payment from '../models/paymentmodel.js'
import user from '../models/usermodel.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }

const create = async(req, res) => {
    const newPayment = await payment.create(req.body)

    if(newPayment){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

const get = async(req, res) => {
    console.log(req)
    const user_id = parseJwt(req)
    const person = await user.getById(user_id)
    if (person == null) {
        res.status(500).send({message: 'Gebruiker bestaat niet.'})
      } else {
        const paymentList = await payment.get(person.unique_id)
        
        res.status(200).send({payments: paymentList})
       
      }
    
}

export default {create, get}