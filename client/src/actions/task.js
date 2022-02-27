import { getAllTasks } from '../api/taskApi';

export const loadingTasks = () => ({
    type: 'LOADING_TASKS',
    data: []
})

export const loadedTasks = (tasks) => ({
    type: 'LOADED_TASKS',
    data: tasks
})

export const erroredTasks = (error) => ({
    type: 'ERROR_TASKS',
    data: error
})

export const addNewTask = (task) => ({
    type: 'ADD_NEW',
    data: task
})

export const editTask = (task) => ({
    type: 'UPDATE_TASK',
    data: task
})

export const removeTask = (task) => ({
    type: 'DELETE_TASK',
    data: task
})

export const loadTasks = () => (dispatch) => {
    dispatch(loadingTasks())
    getAllTasks()
        .then((res) => {
            dispatch(loadedTasks(res.data))
        })
        .catch((error) => {
            dispatch(erroredTasks(error))
        })

}