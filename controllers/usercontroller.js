import user from '../models/usermodel.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

function generateAccessToken(id) {
    const payload = { userId: id };
    const options = { expiresIn: '1800s' };
    return jwt.sign(payload, process.env.TOKEN_SECRET, options);
  }

const create = async(req, res) => {
    const person = await user.create(req.body)

    if(person){
        res.status(200).send({message: 'Ok!'})
    }else{
        res.status(500).send({message: 'Error.'})
    }
}

const login = async(req, res) => {
    
    const {username, password} = req.body

    const person = await user.get(username)
    if (person == null) {
        res.status(500).send({message: 'Gebruiker bestaat niet.'})
      } else {
        const isMatch = await bcrypt.compare(password, person.password)
        if(isMatch){
            const token = generateAccessToken(person.id)
            res.status(200).send({token: token})
        }else{
            res.status(500).send({message: 'Fout wachtwoord.'})
        }
      }
    
}

export default {create, login}