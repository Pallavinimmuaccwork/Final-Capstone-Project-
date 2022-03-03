const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


const dataSchema = new mongoose.Schema({

    name: { type: String },
    email: { type: String },
    password: { type: String },
    date: { type: String },
    role: { type: String },
    test: { type: Boolean },
    status: {
        hemo: { type: Boolean },
        thyr: { type: Boolean },
        glu: { type: Boolean },
    },

    heamatology: [{
        haemoglobin: { type: String },
        neutrophils: { type: String },
        eosinophiles: { type: String },
        basophills: { type: String },
        pcv: { type: String },
        wbc: { type: String },
        lymphocytes: { type: String },
        monocytes: { type: String },
        rbc: { type: String },
        mcv: { type: String },
    }],

    glucometry: [{
        fbs: { type: String },
        ppbs: { type: String },
        gh: { type: String },
        calcium: { type: String },
    }],

    thyroid: [{
        tri: { type: String },
        thyroxine: { type: String },
        tsh: { type: String },
    }],

   
});



dataSchema.methods.ganerateToken = async function () {
    console.log("generateAuthToken");
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY,);
        // this.tokens = this.tokens.concat({ token: token });
        // await this.save();
        return token;
    } catch (err) {
        console.log("err:", err);
    }
};

const database = mongoose.model("database", dataSchema);

module.exports = database;
