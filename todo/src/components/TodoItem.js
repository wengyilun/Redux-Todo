import React from 'react'
import {connect} from 'react-redux'
import { updateTodo, toggleComplete, deleteTodo} from '../action'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

class TodoItem extends React.Component{
	state ={
		isEditing: false,
		todo:null
	}
	
	static getDerivedStateFromProps(nextProps, prevState){
		console.log('prevState',prevState)
		console.log('nextProps',nextProps)
		if(!prevState.isEditing){
			return {
				todo:{...nextProps.todo},
			}
		}else{
			return null
		}
	}
	

	toggleEdit = ()=>{
		this.setState({isEditing: true})
	}

	onChangeHandler = (e)=>{
		e.persist();
		const todo = 	{...this.state['todo'],  [e.target.name]: e.target.value}
		this.setState(
		{
				todo: todo
		})
	}
	
	onKeyUpHandler = (e) =>{
		e.persist();
		if(e.key === "Enter"){
			this.props.updateTodo(this.state.todo)
			this.setState({isEditing:false});
		}
	}
	
	onMouseLeave = (e) =>{
		this.setState({isEditing:false});
	 }
	
	onToggleComplete = (e)=>{
		console.log('toggleComplete:', this.state.todo.id)
		this.props.toggleComplete(this.state.todo.id)
	}
	
	onDelete = (e)=>{
		console.log('onDelete:', this.state.todo.id)
		this.props.deleteTodo(this.state.todo.id)
	}
	
	render(){
		return(
			<div className="todo-input-container" >
				<input  type="checkbox"
						className="completedCheckbox"
						defaultChecked={this.state.todo.completed}
						onClick={e => this.onToggleComplete(this.state.todo.id)}/>
				
				 <FontAwesomeIcon className="delete-icon" icon={faTimes} onClick={this.onDelete}/>
				 
				<div className="content">
				{
					this.state.isEditing ?
						<input  type="text"
								name="value"
								ref={input => input && input.focus()}
								placeholder="Enter Todo"
								onChange={e => this.onChangeHandler(e)}
								onKeyUp={e => this.onKeyUpHandler(e)}
								onMouseLeave={e=> this.onMouseLeave(e)}
								value={this.state.todo.value} />
						
						:
						
						<div className="todo-item">
							<h1 onClick={this.toggleEdit}>{this.state.todo.value}</h1>
							<span>{this.state.todo.completed && 'Completed'}</span>
						</div>
				}
				</div>
				
			</div>
		)
	}
}


export default connect(null,
{
toggleComplete,
updateTodo,
deleteTodo
}) (TodoItem)
