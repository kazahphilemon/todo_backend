const express = require("express");
const app = express()
const useRouter = require("./Router/users");
const connectDb = require("./confi/db");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const ejs = require("ejs")
const cors = require("cors");
app.use(cors())
require("./Router/index")(app)
app.use(bodyParser.json())
app.use(cookieParser())
app.set("view engine", "ejs")


app.use(express.json());
app.use(express.urlencoded({extended: true}))
connectDb()



const PORT = 5000
const helloworld =(req, res)=>{
    res.send('hello world, welcome ')
}


const server = app.listen(
    PORT,
    console.log(
        `Server is runing on port ${PORT}`
    )
)
