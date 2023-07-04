const express = require("express");
const app = express()
const useRouter = require('../backend-tutorial/Router/users');
const connectDb = require("./confi/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs")

app.use(bodyParser.json())
app.use(cookieParser())
app.set("view engine", "ejs")
// app.use(cors)

app.use(express.json());
app.use(express.urlencoded({extended: true}))
connectDb()



const PORT = 5000
const helloworld =(req, res)=>{
    res.send('hello world, welcome ')
}
app.get("/", helloworld)
app.use("/users", useRouter )

const server = app.listen(
    PORT,
    console.log(
        `Server is runing on port ${PORT}`
    )
)
