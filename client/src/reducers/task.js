const initState = {
    isLoading: true,
    tasks: [],
    error: null
}
export default (state = initState, { type, data }) => {
    switch (type) {
        case 'LOADING_TASKS':
            return {
                ...state,
                isLoading: true
            }
        case 'LOADED_TASKS':
            return {
                ...state,
                isLoading: false,
                tasks: data
            }
        case 'ERROR_TASKS':
            return {
                ...state,
                isLoading: false,
                error: data
            }
        case 'ADD_NEW':
            state.tasks.push(data)
            return state
        case 'UPDATE_TASK':
            const task_index = state.tasks.findIndex(task => task._id === data._id)
            state.tasks[task_index] = data
            return state
        case 'DELETE_TASK':
            const updTasks = state.tasks.filter(task => task._id !== data._id)
            return {
                ...state,
                tasks: updTasks
            }
        default:
            return state
    }
}