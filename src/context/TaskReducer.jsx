const TaskReducer = (state, action) => {
    switch(action.type){
        case 'GET_TASK':
            return {...state, current_task: action.payload}
        default:
            return state
    }
}

export default TaskReducer