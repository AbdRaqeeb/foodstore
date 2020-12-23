import PayStack from 'paystack-node';
import 'dotenv/config.js';

const paystack = new PayStack(process.env.PAYSTACK_API_KEY, process.env.NODE_ENV_PAYSTACK);

export default paystack;