import express from 'express'
import { User } from '../models/user.model.js'
import jwt  from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import checkLoggedIn from '../middleware/authmiddleware.js'
import cookieParser from 'cookie-parser'
const app = express();
app.use(cookieParser());

const userRouter = express.Router()

userRouter.post("/signup", async (req, res)=>{
    try {
        const { username, firstname, lastname, email, password } = req.body;
        const encryptPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            username,
            firstname,
            lastname,
            email,
            password: encryptPassword
        })
        res.status(201).json({
            sucess:true,
            user
        })
       } catch (error) {
        res.status(501).json({
            success: false,
            message: "Please check your Username and Email it should be unique",
        });
       }
})

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (user){
           const Bcrypt = await bcrypt.compare(password, user.password);
        if (Bcrypt){
            const token = jwt.sign(
                {
                    _id:user.id,
                    username:user.username,
                    email: user.email,
                },
                `${process.env.JWT_SECRET_KEY}`,
                {
                    expiresIn: `${process.env.JWT_EXPIRES}`,
                }
            );

            res.status(200).json({
                success: true,
                token
            });
           } else {
                res.status(400).json({
                    success: false,
                    user: false,
                    message: "Invalid Credentials in bcrypt"
                });
             } 
         } else {
            res.status(400).json({
                success: false,
                user: false,
                message: "Invalid Credentials"
            });
        }
    } catch (err) {
        console.log("Error in login", err);
        res.status(500).json({
            success: false,
            message: "An error occurred while logging in. Please try again later.",
        });
    }
});

userRouter.get("/checkauth", checkLoggedIn, (req,res)=>{

        
        res.status(200).json({ 
            message: 'Access Granted',
            sucess:true,
 })
})

export default userRouter;