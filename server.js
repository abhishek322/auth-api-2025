require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const userRouter = require("./routes/auth-router")
const homeRouter = require("./routes/home-router");
const adminRouter = require("./routes/admin-router");

const PORT = process.env.PORT || 3000
const app = express();

//connect mongoose
connectToDB();


//adding middleware
app.use(express.json());


app.use('/api/auth', userRouter);
app.use('/api/home', homeRouter);
app.use('/api/admin', adminRouter);


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})