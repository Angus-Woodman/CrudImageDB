const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors")

// Connect DB
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err)); 

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/user', require('./routes/user'))

// app.listen(5000, () => console.log("Server is running"));

const port = process.env.PORT || 5000; // if there is no PORT env variable, 3000 will be used
app.listen(port, () => console.log(`Express is running on port ${port}`))