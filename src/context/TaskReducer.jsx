const TaskReducer = (state, action) => {
    switch(action.type){
        case 'GET_TASK':
            return {
                ...state, current_task: action.payload,}
        case 'UPDATE_TASK':
            return {...state, current_task: action.payload}
        case 'DELETE_TASK':
            return {...state, current_task: action.payload}
        case 'OPEN_DIALOG':
            return {...state, dialogOpen: true}
        case 'CLOSE_DIALOG':
            return {...state, dialogOpen: false}
        default:
            return state
    }
}

export default TaskReducer