const express = require("express")
const userController = require("../controller/user-controller")
const todoController = require("../controller/todo-controllers")
const userService = require('../services/user-service')
const { requireAuth } = require("../auth/authmiddleware")



const router = express.Router()


router.post("/create", userController.registration)
router.post("/login",  userController.login)
router.get("/", requireAuth, todoController.alltodos)
router.post("/todo/create",requireAuth, todoController.createTodo)
router.get("/singleuser", requireAuth, userService.singleUser)
router.delete("/delete/:id",requireAuth, todoController.deleteTodo)
router.put("/update/:id", requireAuth, todoController.updateTodo)


module.exports = router