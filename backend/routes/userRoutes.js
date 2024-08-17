const router = require("express").Router();
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

// for chaining multiple routes with whatever we've written 
// in server file, it will be like -> 'api/user/(if it is post request then it will go for registerUser) otherwise'
// router.route("/").get(protect, allUsers);
// router.route('/').get(allUsers);

router.route("/").post(registerUser).get(allUsers); 
router.post("/login", authUser);

module.exports = router;
