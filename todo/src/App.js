import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import TodoList from "./components/TodoList";

class App extends Component {
  render() {
    return (
      <div className="App">
         <h1>Todo List (Redux)</h1>
         <TodoList/>
      </div>
    );
  }
}

export default App;
