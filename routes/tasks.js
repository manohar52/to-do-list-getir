const express = require("express")
const Task = require("../models/task")

const router = express.Router()

// get all tasks
router.get("/", (req, res) => {
    Task.find()
        .then((dbres) => {
            res.json(dbres)
        })
        .catch((error) => {
            res.send(error)
        })
})

// get task by id
router.get("/:id", (req, res) => {
    Task.findById(req.params.id)
        .then((dbres) => {
            res.json(dbres)
        })
        .catch((error) => {
            res.send(error)
        })
})

// create new task
router.post("/", (req, res) => {
    const task = new Task({
        name: req?.body?.name,
        isComplete: req?.body?.isComplete
    })
    task.save()
        .then((dbResponse) => {
            res.json(dbResponse)
        })
        .catch((error) => {
            res.send(error)
        })
})

// update a task by id
router.put("/:id", (req, res) => {
    Task.findById(req.params.id)
        .then((currentTask) => {
            currentTask.name = req?.body?.name
            currentTask.isComplete = req?.body?.isComplete
            currentTask.save()
                .then((dbres) => {
                    res.json(dbres)
                })
                .catch((error) => {
                    res.send(error)
                })
        })
        .catch((error) => {
            res.send(error)
        })
})

// delete task by id
router.delete("/:id", (req, res) => {
    Task.findById(req.params.id)
        .then((currentTask) => {
            currentTask.remove()
                .then((dbres) => {
                    res.json(dbres)
                })
                .catch((error) => {
                    res.send(error)
                })
        })
        .catch((error) => {
            res.send(error)
        })
})
module.exports = router