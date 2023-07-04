const mongoose = require('mongoose')


const TodoModel = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    task :{
        type: String,
        required:[true, "adding an empty to_do is not allow"]
    }
    
})


module.exports = mongoose.model('Userlist', TodoModel)