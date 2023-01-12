const express = require("express");

const cookieParser = require("cookie-parser");


const authRouter =require("./routes/authRoutes");
const userRouter=require("./routes/userRoutes");
const planRouter=require("./routes/planRoutes");

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/auth", authRouter);


app.use("/api/v1/user", userRouter);


app.use("/api/v1/plan", planRouter);


app.use(function(req,res){
  res.send("<h1>Backend Deployed</h1>");
})

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Server is connected at port 5000");
});

