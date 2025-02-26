const express = require("express");
const mongoose = require("mongoose");
const router = require("./router");
const cors = require("cors");
const dotenv = require('dotenv').config();
const PORT = dotenv.parsed.PORT || 5000;

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: dotenv.parsed.DB_FRONT_URL,
  }),
);
app.use("/", router);

const start = async () => {
  try {
    await mongoose.connect(
      dotenv.parsed.DB_MONGODB_KEY,
      {
          useNewUrlParser: true,
          useUnifiedTopology: true
      }
  );
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log('connection error', e);
    
  }
};

start();
