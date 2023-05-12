const express = require("express");
const cors = require("cors");
//routes
const mapRouter = require("./routes/googleMap.js");

const app = express();
app.use(cors());
app.use(express.json());

// applying router
app.use("/maps", mapRouter);

// Server started on port 6099
app.listen(6099, () => {
  console.log("Server listening on port 6099");
});
