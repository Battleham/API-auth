const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

// Create a schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
   password: {
       type: String,
       required: true
   }
});

userSchema.pre('save', async function(next) {
    try {
        // Generage a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash (salt + hash is what is stored!!)
        const passHash = await bcrypt.hash(this.password, salt);
        // re-assign the password hash to the password variable
        this.password = passHash;
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(pwdProvided){
    try {
        return await bcrypt.compare(pwdProvided, this.password);
    } catch (error) {
        throw new Error(error);
    }
};


// Create model
const User = mongoose.model('user', userSchema);




//Export model
module.exports = User;