const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet")
require("dotenv").config();

// set up express

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

const PORT = 4242;

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

// set up mongoose

mongoose.connect(
  process.env.MONGODB_DOCKER,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);

// set up routes

app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));