import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, "secret123");
      const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
      if (req.body.email == user.email && req.body.password == decryptedPass) {
        const token = CryptoJS.AES.encrypt(user.email, "secret123").toString();
        console.log(token);
        res.status(200).json({
          success: true,
          token,
          email: user.email,
          name: user.name,
        });
      } else {
        res.status(200).json({
          success: false,
          invalid: true,
          error: "Invalid Credentials",
        });
      }
    } else {
      res.status(200).json({ success: false, error: "User not found" });
    }
  } else {
    res.status(400).json({ error: " This Method is not allowed! " });
  }
};
export default connectDb(handler);
