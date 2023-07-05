const userRouter = require("./users")
module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next()
    })
    // app.get("/", helloworld)
    app.use("/users", userRouter )
}