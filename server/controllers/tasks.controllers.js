import Task from "../models/Task.js"
import { asyncWrapper } from "../middleware/async.js"
import { createCustomeError } from "../errors/custome-error.js"

export const createTask = asyncWrapper(async (req, res) => {
    const task = new Task(req.body)
    await task.save()
    res.status(201).send(task)
})


export const getTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find()
    res.status(200).send(tasks)
})

export const getTask = asyncWrapper(async (req, res, next) => {
    const task = await Task.findOne({_id: req.params.id})
    if(!task) {
        return next(createCustomeError(`No task found with id ${req.params.id}`, 404,))
    }
    res.status(200).json(task)

})

export const updateTask = asyncWrapper(async (req, res) => {
    const task = await Task.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true})
    if(!task) {
        return next(createCustomeError(`No task found with id ${req.params.id}`, 404,))
    }
    res.status(200).json(task)
})


export const deleteTask = asyncWrapper(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) {
        return next(createCustomeError(`No task found with id ${req.params.id}`, 404,))
    }
    res.status(200).json(`Task ${task.name} deleted`)
})