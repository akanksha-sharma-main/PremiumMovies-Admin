import Movies from "../../models/Movies"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        let m = new Movies(req.body)
        await m.save()
        res.status(200).json({success: true})
    }
    else {
        res.status(400).json({ error: " This Method is not allowed! " })
    }
}
export default connectDb(handler)
