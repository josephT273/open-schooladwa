import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import "dotenv/config";

// Routes
import generativeAI from "./routes/generative-ai.js";
import googleBooks from "./routes/googlebooks.js";
import openlibrary from "./routes/openlibrary.js";
import dictionaryapi from "./routes/dictionaryapi.js";

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

// ENDPOINT
app.use("/generativeAI", generativeAI);
app.use("/googlebooks", googleBooks);
app.use("/openlibrary", openlibrary);
app.use("/dictionaryapi", dictionaryapi);

// Import the server port form env file
const PORT = process.env.PORT || 7000;

// *Server
app.listen(PORT, () => {
  console.log(`🚀 The server started http://localhost:${PORT}`);
});
