// import express from "express";
// import axios from "axios";

// const route = express.Router();

// var welcomeMessage =
//   "Welcome to Google's Books API route! Use /search to search for books.";
// const welcome = (req, res) => {
//   return res.send(welcomeMessage);
// };

// const search = (req, res) => {
//   var response =
//     "/googlebooks/search/:book route fetches all results mentioning the searched book.";
//   return res.send(response);
// };

// const book = async (req, res) => {
//   const { book } = req.param;
//   const result = await axios.get(
//     `https://www.googleapis.com/books/v1/volumes?q=${book}`
//   );

//   return res.json(result.data);
// };

// route.route("/").get(welcome);
// route.route("/search").get(search);
// route.route("/search/:book").get(book);

// export default route;
