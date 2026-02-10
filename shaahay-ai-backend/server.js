require("dotenv").config();
const express = require("express");
const cors = require("cors");

const chatRoute = require("./routes/chat");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoute);

app.listen(process.env.PORT, () => {
  console.log(`Shaahay AI running on port ${process.env.PORT}`);
});
