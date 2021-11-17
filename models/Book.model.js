const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  name: {type: String, required: true},
  author: {type: String, required: true},
  price: {type: Number, required: true}
  }, {timestamps: true}
);

const Book = model("Book", bookSchema);

module.exports = Book;
