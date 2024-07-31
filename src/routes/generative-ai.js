import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";

const route = express.Router();

// *API_KEY
const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// *Select Model
const model = generativeAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

var welcomeMessage =
  "Welcome to Google's AI API route! Use /chat to chat with gemini-1.5-flash.";
const welcome = (req, res) => {
  return res.send(welcomeMessage);
};

const chat = async (req, res) => {
  const { prompt } = req.body;
  const result = await model.generateContent(prompt);

  return res.status(200).json({
    statusCode: 200,
    data: result.response.text(),
  });
};

route.route("/").get(welcome);
route.route("/chat").post(chat);

export default route;
