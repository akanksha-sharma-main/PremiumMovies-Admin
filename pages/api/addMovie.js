// Next.js API route support: req.body[i].title ,
import Movies from "../../models/Movies"
import connectDb from "../../middleware/mongoose"

const handler = async (req, res) => {
    if (req.method == 'POST') {
        // for (let i=0; i<req.body.length; i++){
        let m = new Movies(req.body)
        await m.save()
        // }
        res.status(200).json({success: 'success'})
    }
    else {
        res.status(400).json({ error: " This Method is not allowed! " })
    }
}
export default connectDb(handler)
