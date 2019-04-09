import {
ADD_TODO,
TOGGLE_COMPLETE,
UPDATE_TODO,
DELETE_TODO
} from "../action";


const initialState = {
	todos: [
		{
			id: 0,
			value: 'Learn Redux',
			completed: false
        },
		{
			id: 1,
			value: 'Learn JS',
			completed: true
        },
		{
			id: 3,
			value: 'Ellen WEng',
			completed: false
		}
	]
}

export const reducer = (state=initialState, action)=>{
	switch(action.type){
		case ADD_TODO:
			return {
				todos:[
					...state['todos'],
					{...action.todo, id:state.todos.length}
				]
			}
		case DELETE_TODO:
			const arr = state.todos.filter(todo => todo.id !== action.todoId)
			return {
				todos: [...arr]
			}
		
		case UPDATE_TODO:
			const index = state.todos.findIndex(el => el.id === action.todo.id)
			return {
				todos:[
					...state.todos.slice(0, index),
					{...action.todo},
					...state.todos.slice(index+1),
				]
			}
		
		case TOGGLE_COMPLETE:
			const index2 = state.todos.findIndex(el => el.id === action.todoId)
			return {
				todos:[
					...state.todos.slice(0, index2),
					{...state.todos[index2], completed: !state.todos[index2].completed},
					...state.todos.slice(index2 + 1),
				]
			}
			
		default:
		return state
	}
}
