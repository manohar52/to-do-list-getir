// import axios from "axios";
import { get, post, put, remove } from './config'

export const getAllTasks = () => {
    return get('/api/tasks/');
}

export const createNewTask = (task) => {
    return post('/api/tasks', task)
}

export const updateTask = (task) => {
    return put(`/api/tasks/${task._id}`, task)
}

export const deleteTask = (task) => {
    return remove(`/api/tasks/${task._id}`)
}