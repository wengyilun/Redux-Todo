import React from 'react'
import {connect} from 'react-redux'
import {addTodo, toggleComplete} from '../action'
import TodoItem from "./TodoItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes, faSearch} from "@fortawesome/free-solid-svg-icons";
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class TodoList extends React.Component{
	state ={
		isEditing: false,
		showCompletedOnly: false,
		searchQuery: '',
		newTodo:{
			value:'',
			completed: false
		}
	}
	
	toggleEditNewTodo = ()=>{
		this.setState({isEditing: true})
	}
	
	onChangeHandler = (e)=>{
		e.persist();
		this.setState(
		{
			newTodo:{
				...this.state['newTodo'],
				value: e.target.value}
		})
	}
	
	onSearchQueryChange = (e)=>{
		this.setState({
			searchQuery:e.target.value
		})
	}
	
	// onSearch = (e)=>{
	// 	this.setState({
	// 		searchQuery:e.target.value
	// 	})
	// }
	
	onKeyUpHandler = (e) =>{
		e.persist();
		const isNotEmpty =  this.state.newTodo.value.length > 0
		if(e.key === "Enter" && isNotEmpty){
			this.props.addTodo(this.state.newTodo)
			this.setState({newTodo:{
					value:'',
					completed: false
			}})
			this.setState({isEditing:true})
		}
	}
	
	showCompletedTask = (e) =>{
		console.log('e.target', e.target)
		this.setState({
		showCompletedOnly: e.target.checked})
	}
	
	render(){
		let filteredArr = [...this.props.todos]
		
		const match = new RegExp(escapeRegExp(this.state.searchQuery), 'i')
		filteredArr = filteredArr.filter((todo) => match.test(todo.value))
		
		if(this.state.showCompletedOnly){
			filteredArr =  this.props.todos.filter(todo => todo.completed)
		}
		
		return(
			<div>
				<header className="search">
					<input  type="text"
							placeholder="Search Task"
							name="searchQuery"
							onChange={e => this.onSearchQueryChange(e)}
							value={this.state.searchQuery}/>
					  <FontAwesomeIcon icon={faSearch} />
				</header>
				
				<div className="todo-list">
					{
						filteredArr.length > 0 ?
							 filteredArr.map((el, idx) => {
									return <TodoItem key={idx} test="testing" todo={el}/>
							 })
							 :
							 <h1>You don't have any items to show</h1>
					}
					
					<div className="todo-input-container"
						 onClick={this.toggleEditNewTodo}
						 >
						{
							this.state.isEditing && !this.state.showCompletedOnly ?
								(<input  type="text"
										placeholder="Enter Todo"
										onChange={e => this.onChangeHandler(e)}
										onKeyUp={e => this.onKeyUpHandler(e)}
										value={this.state.newTodo.value}/>
								)
							:
								(<div className="todo-item new-todo" />)
						}
					
					</div>
				</div>
				
				<div className="bottom-drawer">
					<div className="completed-tasks">
						{this.props.completedCount} COMPLETED TASKS</div>
					<div className="completed-tasks">
						<input
							type="checkbox"
							defaultChecked={this.state.showCompletedOnly}
							onClick={this.showCompletedTask}
						/> SHOW COMPLETED TASKS</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state)=>{
	console.log('state.todos', state.todos)
	return {
		todos:state.todos,
		completedCount:	state.todos.filter(todo => todo.completed).length
	}
}


export default connect(mapStateToProps, {addTodo})(TodoList)
