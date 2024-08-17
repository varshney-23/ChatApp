const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db");

const userRoutes = require('./routes/userRoutes');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const app = express();

dotenv.config();
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: ['http://localhost:3000']}));

app.get("/", (req, res) => {
    res.send("API is running");
});

app.use('/api/user', userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(8080, ()=>{
    console.log(`server started at port ${PORT}`.magenta);
});