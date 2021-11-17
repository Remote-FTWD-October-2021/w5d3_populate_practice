const router = require("express").Router();

//Models
const User = require('../models/User.model')

/* GET create new user page */
router.get("/create", (req, res) => {
  res.render("createUser.hbs");
});

/* GET user by its ID */
router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).populate('books')

  // const books = user.books
  const {books} = user
  
  res.render("user.hbs", {books});
});

/* POST create new user */
router.post("/create", async (req, res)=>{
  // const username = req.body.username;
  // const password = req.body.password;

  const {username, password} = req.body; //Esta linea hace lo mismo que la 10 y la 11 juntas

  try{
    const createdUser = await User.create({username, password})
    res.render("createUser.hbs", {justCreatedUser: createdUser.username})
  }catch(err){
    console.log(err)
  }

})

module.exports = router;