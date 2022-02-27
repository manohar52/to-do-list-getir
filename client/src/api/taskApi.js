// import axios from "axios";
import { get, post, put, remove } from './config'

export const getAllTasks = () => {
    return get('/tasks/');
}

export const createNewTask = (task) => {
    return post('/tasks', task)
}

export const updateTask = (task) => {
    return put(`/tasks/${task._id}`, task)
}

export const deleteTask = (task) => {
    return remove(`/tasks/${task._id}`)
}