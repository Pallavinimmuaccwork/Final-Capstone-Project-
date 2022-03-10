const express = require('express')
const app = express();
const cookieparser = require('cookie-parser')
const cors = require('cors')

app.use(cors())

const Authenticate = require('./middleware/Authenticate')

//    import database connection part
require("./db/conn");

app.use(express.json());
app.use(cookieparser());
const database = require('./model/dataSchema');

app.post('/', function (req, res) {
    res.send(req.body)
})

app.post('/login', async (req, res) => {
    console.log('login', req.body);
    const { email, password } = req.body

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
            // console.log(data);
            token = await data.ganerateToken();

            // let token = jwt.sign({ email: email }, process.env.SECRET_KEY,)


            // console.log('TOKEN===>>',token);
            res.cookie(`brotokens`, token)
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
                        token:token
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

app.post('/register', async (req, res) => {

    // console.log(req.body);
    const { name, email, password, role, test } = req.body

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
                const newUser = new database({ name, email, password, role, test });
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

app.get('/sample', Authenticate, async (req, res) => {
    // console.log(req.token)
    res.send(req.token);
})

app.get('/Entersample', Authenticate, async (req, res) => {
    console.log('1111', req.body);
    res.send(req.token)
})

app.post('/Entersample', async (req, res) => {


    const { user, hemo, thyr, glu } = req.body
    console.log(user, hemo, thyr, glu);

    // const status = { status: true, data: [{  hemo, thyr, glu }] }
    const status = { hemo, thyr, glu }


    await database.updateOne({ _id: user }, { $set: { test: true } })
    await database.updateOne({ _id: user }, { $set: { status: status } })


    res.send(req.body)
})

app.post('/heamatology', async (req, res) => {
    console.log(req.body)
    const { id, haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv } = req.body
    const heamatology = { haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv }
    await database.updateOne({ _id: id }, { $set: { heamatology: heamatology, test: true } });

    res.send(req.body);

})

app.post('/thyroid', async (req, res) => {

    console.log(req.body);
    const { id, tri, tsh, thyroxine } = req.body
    const thyroid = { tri, tsh, thyroxine }

    await databa-se.updateOne({ _id: id }, { $set: { thyroid: thyroid, test: true } })

    res.json("data submited")
})

app.post('/glucometry', async (req, res) => {

    console.log(req.body);
    const { id, fbs, ppbs, gh, calcium } = req.body
    const glucometry = { fbs, ppbs, gh, calcium }
    await database.updateOne({ _id: id }, { $set: { glucometry: glucometry, test: true } })

    res.send(req.body)

})

app.put('/edituser',async(req,res)=>{
    
        let {_id,name}=req.body;
        await database.updateOne(
            {_id},{
                $set:{
                    name
                }
            }
        )
    res.send(req.body);
})


module.exports = app;