import paymentcontroller from '../controllers/paymentcontroller.js'
import express from 'express';
import dotenv from 'dotenv'
import axios from 'axios'; // Import axios
dotenv.config()
const router = express.Router();

router.route('/create')
.post(paymentcontroller.create)

router.route('/getpayments')
.get(paymentcontroller.getpayments)

router.post('/payment', async (req, res) => {
    try {
        const { amount, description, redirectUrl } = req.body;

        console.log(req.body)

        const paymentResponse = await axios.post('https://api.mollie.com/v2/payments', {
            "amount": amount, 
            "description": description,
            "redirectUrl": redirectUrl
        }, {
            headers: {
                'Authorization': process.env.MOLLIE_API_KEY,
            }
        });

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
});

export default router;
