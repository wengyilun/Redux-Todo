export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE'
export const UPDATE_TODO = 'UPDATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'

export const addTodo = (todo)=>{
	return {
		type: ADD_TODO,
		todo
	}
}

export const updateTodo = (todo)=>{
	return {
		type: UPDATE_TODO,
		todo
	}
}


export const toggleComplete = (todoId)=>{
	console.log('todoId', todoId)
	return {
		type: TOGGLE_COMPLETE,
		todoId
	}
}


export const deleteTodo = (todoId)=>{
	return {
		type: DELETE_TODO,
		todoId
	}
}
