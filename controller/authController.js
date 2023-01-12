const jwt = require("jsonwebtoken");
const secrets = process.env || require("../secrets");
const UserModal = require("../modal/modal");
const userModal = require("../modal/modal");
const mailSender = require("../raw/pocs/mailsender");

async function signupController(req, res) {
  try {
    let data = req.body;
    console.log(data);
    let newUser = await UserModal.create(data);
    console.log(newUser);
    res.status(201).json({
      result: "user signed up",
    });
    res.end("Data is fetched");
  } catch (error) {
    res.status(400).json({
      results: error.message,
    });
  }
}

async function loginController(req, res) {
  try {
    let data = req.body;
    let { email, password } = data;
    if (email && password) {
      let user = await UserModal.findOne({ email: email });
      if (user) {
        if (user.password == password) {
          // payload ,secret text,algorithms->SHA256
          //payload ,secrets,algo by default no need to use declare sha256 is used
          const token = jwt.sign(
            {
              data: user["_id"],
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, //time is in milli second *60 and *24 is one day
            },
            secrets.JWTSECRET
          );
          //put token into cookies
          res.cookie("JWT", token);
          //send the token into cookies
          user.password = undefined;
          user.confirmPassword = undefined;
          console.log("login", user);
          //before sending to front end password and confirmpassword is deleted
          res.status(200).json({
            user,
          });
          res.send("user is login");
        } else {
          res.status(400).json({
            result: "Email and password doesn't match ",
          });
        }
      } else {
        res.status(404).json({
          result: "user not found",
        });
      }
    } else {
      res.status(400).json({
        result: "user not found kindly signup",
      });
    }
  } catch (error) {
    res.status(500).json({
      result: error.message,
    });
  }
}

async function forgetpasswordController(req, res) {
  try {
    let { email } = req.body;
    //mail a gya
    // by default- FindAndUpdate -> not updated send document,
    // new =true -> you will get updated doc
    //email-> do we have a user -> no user
    //update
    let user = await userModal.findOne({ email });
    if (user) {
      let otp = otpgenerator();
      let otpexpire = Date.now() + 5 * 60 * 1000;
      await mailSender(email, otp);
      user.otp = otp;
      user.otpExpiry = otpexpire;
      await user.save();
      res.status(204).json({
        data: user,
        result: "Otp send to your mail",
      });
    } else {
      res.status(404).json({
        result: "user with this email is not found",
      });
    }
  } catch (error) {
    res.send(error.message);
  }
}

async function resetpasswordController(req, res) {
  try {
    let { otp, password, confirmPassword, email } = req.body;
    //search user too show otp timeouy
    let user = await userModal.findOne({ email });
    let currentTime = Date.now();

    if (currentTime > user.otpExpiry) {
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();
      res.status(200).json({
        result: "otp Expired",
      });
    } else {
      if (user.otp != otp) {
        res.status(200).json({
          message: "wrong otp",
        });
      } else {
        user = await userModal.findOneAndUpdate(
          { otp, email },
          {
            password,
            confirmPassword,
          },
          { runValidators: true, new: true }
        );
        //otp delete ->get the document obj -> modify that object by removing useless keys
        user.otp = undefined;
        user.otpExpiry = undefined;
        //save to save this doc in db
        await user.save();
        console.log(user);
        res.status(201).json({
          data: user,
          message: "Passsword for thr use is reset",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      result: "error.message",
    });
    console.log(error);
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~helper functions
function protectRoute(req, res, next) {
  const cookies = req.cookies;
  const JWT = cookies.JWT;
  try {
    if (JWT) {
      console.log("Protect Route is encounter");
      let token = jwt.verify(JWT, secrets.JWTSECRET);
      console.log("jwt decrypted", token);
      let userID = token.data;
      console.log("userid", userID);
      req.userID = userID;
      next();
    } else {
      res.send("You is not logged in kindly login");
    }
  } catch (error) {
    console.log(error);
    if (error.message == "invalid signature") {
      res.send("token invalid kindly login again");
    } else {
      res.end(error.message);
    }
  }
}

function otpgenerator() {
  return Math.floor(100000 + Math.random() * 900000);
}

module.exports = {
  signupController,
  loginController,
  forgetpasswordController,
  resetpasswordController,
  otpgenerator,
  protectRoute,
};
