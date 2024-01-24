import usercontroller from '../controllers/usercontroller.js'
import express from 'express';
import dotenv from 'dotenv'
import axios from 'axios'; // Import axios
dotenv.config()
const router = express.Router();

// router.route('/create')
// .post(usercontroller.create)

router.route('/login')
.post(usercontroller.login)


export default router;
