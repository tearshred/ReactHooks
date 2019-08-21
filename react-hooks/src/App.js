import React, { useState } from 'react';
import './App.css';

function Todo({todo, index, completeTodo, deleteTodo}) {
  return(
    <div
      style={{textDecoration: todo.isCompleted ? 'line-through' : ''}} 
      className="todo">
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => deleteTodo(index)}>x</button>
      </div>
    </div>
  )
}

function TodoForm({addTodo}){
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    
    // Prevent submitting an empty form
    e.preventDefault();

    if(!value) return;

    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        className="input" 
        value={value} 
        placeholder="Add Todo..."
        onChange={e => setValue(e.target.value)}></input>
    </form>
  )
}


function App(){

  const [todos, setTodos] = useState([
    {
      text: 'Learn about React hooks',
      isCompleted: false
    },
    {
      text: 'Do laundry',
      isCompleted: false
    },
    {
      text: 'Build a React To-Do App',
      isCompleted: false
    }
  ]);

  const addTodo = text => {

    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  }

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  }
  
  const deleteTodo = index =>{
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
      <div className="app">
        <div className="todo-list">
          {todos.map((todo,index) => (
            <Todo 
              key={index} 
              index={index} 
              todo={todo} 
              completeTodo={completeTodo} 
              deleteTodo={deleteTodo}/>
          ))}
          <TodoForm addTodo={addTodo} />
        </div>
      </div>
    )

}

export default App;