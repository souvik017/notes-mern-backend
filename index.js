import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Connection from "./Db.js";
import notesRouter from './routes/notes.route.js'
import userRouter from "./routes/user.route.js";

export const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
const port = process.env.PORT;
dotenv.config({
    path: './env'
})
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
app.use(cookieParser());

Connection()
.then(() => {
    app.listen(port, () => {
        console.log(`⚙️   Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})

app.get("/", (req, res)=>{
  const message="server in working";
  res.send(message)
})

app.use("/notes", notesRouter);
app.use("/user", userRouter);