import express from 'express';
import { createOrder, verifyPayment } from '../Controller/PaymentController.js'; 

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

export default router; 