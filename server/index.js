import 'dotenv/config.js';
import colors from 'colors';
import app from "./app.js";

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server ruuning in ${process.env.NODE_ENV} mode on port ${PORT}`.bold.yellow));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red)
    // close server and exit processes
    // server.close(() => process.exit(1))
});
