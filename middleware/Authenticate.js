const database = require("../model/dataSchema")
const jwt = require("jsonwebtoken");



const Authenticate = async (req, res, next) => {

    // console.log('fghjk');

    try {
        const token = req.cookies.brotokens;
        console.log('inside authentication')
        // console.log(token);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log('id:>>>>', verifyToken);
        // const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        const allUsers = await database.find({ role: "user" });
        const rootUser = await database.findOne({ _id: verifyToken._id });
        // console.log('user', rootUser);
        // console.log('admin', allUsers);

        const onedata = [rootUser]
        if (rootUser.role === "admin") {  
            req.token = allUsers;
        }
        else if (rootUser.role === "user") {
            req.token = onedata;
        } else {
            req.token = null 
        }


        next();

    } catch (err) {
        res.status(401).send(" unauthorized user ");
        // console.log("error:", err);
    }

}

module.exports = Authenticate;