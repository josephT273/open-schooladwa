import express from "express";
import axios from "axios";

const route = express.Router();

var welcomeMessage =
  "Welcome to Dictionary's API route! Use /define to search for words.";
const welcome = (req, res) => {
  return res.send(welcomeMessage);
};

const search = (req, res) => {
  var response =
    "/dictionaryapi/define/:word route fetches the definition of the word.";
  return res.send(response);
};

const word = async (req, res) => {
  const { word } = req.param;
  const result = await axios.get(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  return res.json(result.data);
};

route.route("/").get(welcome);
route.route("/define").get(search);
route.route("/define/:word").get(word);

export default route;
