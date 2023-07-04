const Userlist = require("../models/To_do");
const User = require("../models/User");


const alltodos = async(req, res, next)=>{
    try{
       
        
        const todos = await Userlist.find({user: req.user.id})
    // console.log(todos)
    if (!todos)
    return res.status(400).json({
        message: 'null',
        success: false
        
    });
    return res.status(200).json({
        success: true,
        todos: todos,
        message:"tasks fetch succesfully"
    });

    } catch (err){
        console.log(err)
    }
}

const createTodo = async (req, res, next) =>{
  
    try{
        const { task }= req.body
        // creating a new todo
        const todo = await Userlist.create({
            task: task,
            user:req.user.id
        })
        await todo.save();
        // console.log(todo)
        res.status(201).json({
            success: true,
            message: "item created successfully",
            todo:todo
        })

    }
    catch (error){
        console.log(error)
        res.status(400).json({
            messsage:"adding an empty to_do is not allow"
        })
    }

};

const updateTodo = async(req, res, next)=>{
    try{
     
        const { id } = req.params;
        if(id > 24 || id < 24)
        return res.status(400).json({
            message: 'invaild id',
            success: false
        })

        const task = await Userlist.findByIdAndUpdate(id, req.body, {new: true});
        
        
        if (!task)
        return res.status(400).json({
        message: 'invaild',
        success: false
        
    });
    return res.status(200).json({
        success: true,
        todo: task,
        message:"item fetched nd update succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
}


const deleteTodo = async(req, res, next)=>{
    try{
        const { id } = req.params;
        
        if(id.length >24 || id.length <24)
        return res.status(400).json({
            message: 'invaild Id',
            success: false
        })

        const item = await Userlist.findByIdAndDelete(id);

        if (!item)
    return res.status(400).json({
        message: 'invaild',
        success: false
        
    });
    return res.status(200).json({
        success: true,
        item: item,
        message:"item deleted succesfully"
    })

    }catch (err){
        console.log(err.message)
    }
}

module.exports = {
    alltodos,
    createTodo,
    updateTodo,
    deleteTodo
}