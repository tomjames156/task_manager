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
        case 'START_ASSIGN':
            return {...state, assign: true}
        case 'CANCEL_ASSIGN':
            return {...state, assign: false}
        case 'ADD_ASSIGNEE':
            return {
                ...state, 
                assignTo: [...state.assignTo, action.payload]
            }
        case 'CLEAR_ASSIGNEES':
            return {
                ...state,
                assignTo: []
            }
        default:
            return state
    }
}

export default TaskReducer