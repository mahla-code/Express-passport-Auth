const { hash } = require("bcrypt");
const { redirectIfIsAuth, checkAuthentication } = require("../middleware");
const userModel = require("../model/user.model");
const router = require("express").Router();
function initRoutes(passport) {
    router.get("/", (req, res) => {
        res.render("index", {title: "home"})
    })
    router.get("/login", redirectIfIsAuth, (req, res) => {
        res.render("login", {title: "login"})
    })
    router.get("/register", redirectIfIsAuth, (req, res) => {
        res.render("register", {title: "register"})
    })
    router.get("/profile", checkAuthentication, (req, res) => {
        const user = req.user;
        res.render("profile", {title: "profile", user})
    })
    router.get("/logout", checkAuthentication, (req, res,next) => {
        req.logOut({keepSessionInfo: false}, (err) => {
            if(err) return next(err);
            res.redirect("/login")
        });
    })
    router.post("/register", redirectIfIsAuth, async (req, res,next) => {
        try {
            const {fullname: fullName, username, password} = req.body;
            if(!fullName?.trim() || !username?.trim() || !password){
                req.flash("error","همه فیلدها الزامی هستند")
                return res.redirect("/register")
            }
            const user = await userModel.findOne({username})
            if(user) {
                req.flash("error", "این نام کاربری قبلا استفاده شده است");
                return res.redirect( "/register")
            }
            const hashPassword=await hash(password,10)
            await userModel.create({
                fullName, 
                username,
                password: hashPassword
            })
            res.redirect("/login")
        } catch (error) {
            if(error.code ===11000){
                req.flash("error","این نام کاربری قبلا استفاده شده است")
                return res.redirect("/register")
            }
            next(error)
        }
    })
    router.post("/login", redirectIfIsAuth, passport.authenticate('local', {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true
    }))
    return router;
}
module.exports = initRoutes