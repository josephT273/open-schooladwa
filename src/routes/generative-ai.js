import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";

const route = express.Router();

// *API_KEY
const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// *Select Model
const model = generativeAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
const chat = async (req, res) => {
  const { prompt } = req.body;
  const result = await model.generateContent(prompt);

  res.status(200).json({
    statusCode: 200,
    data: result.response.text(),
  });
};

route.use("/chat").post(chat);

export default route;
