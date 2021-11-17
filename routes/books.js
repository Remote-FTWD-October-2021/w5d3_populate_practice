const router = require("express").Router();

//Models
const User = require("../models/User.model");
const Book = require("../models/Book.model");

/* GET view for creating new books */
router.get("/create", (req, res, next) => {
  res.render("createBook.hbs");
});

/* POST create new book */
router.post("/create", async (req, res, next) => {
  // const username = req.body.username
  // const name = req.body.name
  // const author = req.body.author
  // const price = req.body.price

  const { username, name, author, price } = req.body;
  try {
    const userFromDB = await User.findOne({ username });
    if(userFromDB){
      const createdBook = await Book.create({name, author, price})

      const updatedUser = await User.findByIdAndUpdate( userFromDB._id, {$push: {books: createdBook._id}}, {new: true})
      res.redirect(`/users/${updatedUser._id}`)
    } else {
      res.render("createBook.hbs", {errMsg: "Este usuario no existe"})
    }
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
