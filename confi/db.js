const  mongoose  = require("mongoose");

const connectDb = async () =>{
    try {
        // const url = "mongodb+srv://kazahphilemon:kazeem20@cluster0.4todagt.mongodb.net/"
        const conn =  await mongoose.connect("mongodb://127.0.0.1:27017/tutorial", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
                // useCreateIndex: true
                
        })
        console.log(`mongoose Connected: ${conn.connection.host}`);
    } catch (error){
        console.log(error. message);
    }
};


module.exports = connectDb

    



