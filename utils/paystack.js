import PayStack from 'paystack-node';
import 'dotenv/config.js';

const paystack = new PayStack(process.env.PAYSTACK_API_KEY);

export default paystack;