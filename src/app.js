import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import cors from "cors";
import "dotenv/config";

// start express app
const app = express();

// Writing error handlers
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(methodOverride());
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    message: "Something went wrong",
  });
});

// * Welcome
app.get("/", (req, res) => {
  res.send("Welcome to Open-SchoolAdwa");
});

// Import the server port form env file
const PORT = Number.parseInt(process.env.PORT) || 7000;

// *Server
app.listen(PORT, () => {
  console.log(`🚀 Ther server started http://localhost:${PORT}`);
});
