const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookieparser = require('cookie-parser')
const Authenticate = require('../middleware/Authenticate')

require("../db/conn");

const database = require('../model/dataSchema')

router.use(cookieparser())



router.post('/login', async (req, res) => {
    const { email, password } = req.body
    // console.log(req.body);

    if (!email || !password) {
        res.json({
            error: true,
            message: "fill again   ...!",
            data: null
        })
    } else {

        try {
            // const userdata = await database.find({ role: "user" });
            const data = await database.findOne({ email: email, password: password });
            console.log(data);
            token = await data.ganerateToken();

            console.log(token);
            // res.cookie(`brotokens`, token)

            if (!data) {
                res.json({
                    error: true,
                    message: "login failed...!",
                    data: null
                })
            } else {
                res.cookie("brotokens", token)
                if (data.role === "admin") {
                    res.json({
                        error: false,
                        message: "login succesfull...!",
                        role: data.role,
                    })

                } else {
                    res.json({
                        error: false,
                        message: "login succesfull...!",
                        data: data.role
                    })
                }





            }

        } catch (err) {
            console.log('err');
            res.json({
                error: true,
                message: "connection failed",
                data: null
            })
        }
    }



});


router.post('/register', async (req, res) => {


    console.log(req.body);
    const { name, email, password, date, role } = req.body

    if (!name || !email || !password || !role) {
        res.status(401).json({
            error: true,
            message: "Fill the form properly",
            data: null
        })

    } else {

        try {
            const data = await database.findOne({ email: email }).lean();
            console.log(data);
            if (!data) {
                const newUser = new database({ name, email, password, role, });
                newUser.save().then(async () => {
                    res.status(200).json({
                        error: false,
                        message: "Registrated Successfull",
                        data: null
                    })
                })
            } else {
                res.status(200).json({
                    error: true,
                    message: "user already Exist",
                    data: null
                })
            }
        } catch (err) {
            res.status(401).json({
                error: true,
                message: "Registrated failed",
                data: null
            })
        }
    }

})



router.get('/samples',  Authenticate, async (req, res) => {
    res.send('dfghjk')
})


module.exports= router