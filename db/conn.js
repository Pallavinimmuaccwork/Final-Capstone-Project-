const mongoose = require('mongoose');
require('dotenv').config();


const dburl = 'mongodb+srv://pallavi:pallavi1234@cluster0.hlj8q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// const dburl = process.env.DATABASEURL

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log("DataBase connection FAILED", err);
    }
    else {
        console.log(" DataBase Connected ");
    }
}

)
