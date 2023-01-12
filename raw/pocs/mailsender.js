const nodemailer = require("nodemailer");
const secrets = process.env || require("../../secrets");
async function mailSender(email,token) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: "pepcodingdev@gmail.com",
      pass: secrets.APP_PASSWORD,
    },
  });
  let dataObj = {
    from: `"Fred Foo"<foo@exapmple.com>`,
    to: "raunakakarsh@gmail.com",// email pass krna hai
    subject: "hello > Testing from Ronnie",
    html: `<b> HTML TEXT TESTING EMAIL FOR FJP WITH TOKEN ${token}`,
  };
  let info = await transporter.sendMail(dataObj);
}

// mailSender(email,token)
//   .then(function () {
//     console.log("mail send successfully");
//   })
//   .catch(console.error);

module.exports = mailSender;