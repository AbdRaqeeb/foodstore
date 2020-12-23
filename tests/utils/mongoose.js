import mongoose from 'mongoose';
import colors from 'colors';
import 'dotenv/config.js'

export const connect = async () => {
   const conn = await mongoose.connect(process.env.MONGO_URI_TEST, {
       useNewUrlParser: true,
       useCreateIndex: true,
       useFindAndModify: false,
       useUnifiedTopology: true
   });
};

export const disconnect = async () => mongoose.connection.close();