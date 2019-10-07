const JWT = require("jsonwebtoken");
const User = require("../models/user");
const {JWT_SECRET} = require("../configuration");

signToken = user => {
    return JWT.sign({
        iss: 'hamstersgame',
        sub: user.id,
        iat: new Date().getTime(), //current time
        exp: new Date().setDate(new Date().getDate() + 1) //one day ahead
    }, JWT_SECRET);
};

module.exports = {
    //needs email and password
    signUp: async (req, res, next) => {
        //console.log(req.value.body);
        console.log("UsersController.signUp() called!");
        //res.sendStatus(200);
        const {email, password} = req.value.body;
        //check if the email is registered
        const foundUser = await User.findOne({email});

        if (foundUser) {
            return res.status(403).json({error: "Email is already in user."});
        }
        // create a new user
        const newUser = new User ({email, password});


        //respond with token
        console.log("new user: " + newUser);

        await newUser.save((err) => {
            if(err) console.log(err);
            else console.log("all good");
        });
        console.log("User Saved!");
        //res.json("User Created!");

        const token = signToken(newUser);
        
        res.status(200).json({token});

    },

    //passport JS will validate
    //Generate token
    signIn: async (req, res, next) => {
        console.log("successful login!");
        //console.log("req.user ", req.user);
        const token = signToken(req.user);
        res.status(200).json({token});
    },
    secret: async (req, res, next) => {
        console.log("I managed to get here!");
        res.status(200).send({secret: "resource"});

    }
}