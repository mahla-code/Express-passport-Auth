const {Strategy: LocalStrategy} = require("passport-local");
const { compare } = require("bcrypt");
const userModel = require("./model/user.model");
function passportInit(passport){
    const authenticatedUser = async (username, password, done) => {
        try {
            const user = await userModel.findOne({username});
            if(!user || !(await compare(password,user.password))){
             return done(null, false, {message: "user or password incorrect"});
            }
            return done(null,user)
        } catch (error) {
            done(error)
        }
    }
    passport.use("local",new LocalStrategy({usernameField:"username",passwordField:"password"},authenticatedUser))
    passport.serializeUser((user, done) =>  done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user || false)    
        } catch (error) {
            done(error)
        }
    })
}
module.exports = {
    passportInit
}