const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const {ExtractJwt} = require("passport-jwt");
const LocalStrategy = require("passport-local");

const User = require("./models/user");


const {JWT_SECRET} = require("./configuration");


passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //Find the user specified in token. 
        const user = await User.findById(payload.sub);
        //if user doesn't exist handle it
        if (!user) {
            return done(null, false);
        }
        
        //Otherwise, return the user
        done(null, user);

    } catch (error) {
        done(error, false);
    }
}));


//LOCAL STRATEGY

passport.use(new LocalStrategy({
    usernameField: "email"
}, async (email, password, done) => {

    try {
        //Find the user given the email
        const user = await User.findOne({email});
    
        // if not, handle it
        if (!user) {
            return done (null, false);
        }
        // check if the password is correct
        const isPwdMatched = await user.isValidPassword(password);
    
        //if not, handle it
        if (!isPwdMatched) {
            return done(null, false);
        }
        //Otherwise, return the user
        done(null, user);
        
    } catch (error) {
        done(error, false);
    }
}));