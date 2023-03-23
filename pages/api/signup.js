import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      const { name, email } = req.body;
      let u = new User({
        name,
        email,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          "secret123"
        ).toString(),
      });
      await u.save();
      res.status(200).json({ success: true });
    } else {
      res.status(301).json({ success: false, error: "User already exists." });
    }
  } else {
    res.status(400).json({ error: " This Method is not allowed! " });
  }
};
export default connectDb(handler);
