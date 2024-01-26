import express from 'express'
import users from './routes/users.js'
import bodyParser from 'body-parser';
import payments from './routes/payments.js'
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const corsOptions = {
    origin: `${process.env.FRONTEND_URL}`
  };

  

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (req.url != '/users/login' && req.url != '/payments/webhook')
  {
    if (!token) {
      return res.status(401).send('Unauthorized');
    } else {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).send('Forbidden');
        } else 
        {
          req.userId = decoded.userId;
          next()
        }
      });
    }
 
  } else {
    next()
  }
})

app.use('/users', users)
app.use('/payments', payments)



app.listen(3000)

