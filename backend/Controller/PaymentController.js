import Razorpay from 'razorpay';
import crypto from 'crypto';

const razorpay = new Razorpay({
    key_id: 'rzp_test_g7Qv9qKEggFl5v',
    key_secret: 'Y8QkFSSFdOGCde4aGmpQOhGw'
});

export const createOrder = async (req, res) => {
    const { amount, currency, receipt } = req.body;
    try {
        const options = {
            amount: amount * 100, // amount in the smallest currency unit
            currency,
            receipt
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const hmac = crypto.createHmac('sha256', 'Y8QkFSSFdOGCde4aGmpQOhGw');
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');
    if (generated_signature === razorpay_signature) {
      res.status(200).json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid signature' });
    }
  };