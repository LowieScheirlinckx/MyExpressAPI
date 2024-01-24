import express from 'express'
import users from './routes/users.js'
import bodyParser from 'body-parser';
import payments from './routes/payments.js'
import cors from 'cors';

const app = express()

const corsOptions = {
    origin: 'http://localhost:4200'
  };

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/users', users)
app.use('/payments', payments)



app.listen(3000)

