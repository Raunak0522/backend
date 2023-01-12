const userModal = require("../modal/modal");

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CONTROLLER FUNCTIONS~~~~~~~~~~~~~~~~~~~~

async function allusersController(req, res) {
  console.log(req.cookies);
  try {
    let user = await userModal.find();
    res.json(user);
  } catch (error) {
    res.end(error.message);
  }
}

async function userController(req, res, next) {
  //user jo login kia h oska data bss dekhe
  try {
    let userID = req.userID;
    const user = await userModal.findById(userID);
    res.json({
      data: user,
      message: "data about logged in user is send",
    });
  } catch (error) {
    res.send(error.message);
  }
}

module.exports = {
  allusersController,
  userController,
};
