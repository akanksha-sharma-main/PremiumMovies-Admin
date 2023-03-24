import Movies from "../../models/Movies";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let products = await Movies.find({ uploadedBy: req.body.uploadedBy });
    res.status(200).json({ success: true, products });
  } else {
    res.status(400).json({ error: " This Method is not allowed! " });
  }
};
export default connectDb(handler);
