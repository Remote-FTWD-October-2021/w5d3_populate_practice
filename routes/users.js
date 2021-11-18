const router = require("express").Router();

//Models
const User = require('../models/User.model')

const { isLoggedIn } = require("../middleware/route-guard")

//GET profile page
router.get('/profile', isLoggedIn, (req, res)=>{
  const {username} = req.session.loggedUser
  res.render("profile", {username})
})

/* GET user by its ID */
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate('books')

  // const books = user.books
  const {books, username} = user
  
  res.render("user.hbs", {books, username});
});





module.exports = router;