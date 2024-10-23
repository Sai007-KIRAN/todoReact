// import React, { Component } from 'react';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import axios from 'axios';
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// import './index.css';

// class SimpleTodos extends Component {
//   state = {
//     todoList: '',           // Current todo input
//     storeTodo: [],          // Array to store fetched todos
//     isEditing: false,       // Flag for editing state
//     editingId: null,        // ID of the todo being edited
//   };

//   toast = React.createRef(); // Ref for Toast

//   // Fetch todos after component mounts
//   componentDidMount() {
//     this.fetchTodos();
//   }

//   // Fetch todos from the API
//   fetchTodos = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/todos');
//       console.log('Fetched todos:', response.data); // Log fetched data for debugging
//       this.setState({ storeTodo: response.data });
//     } catch (error) {
//       console.error('Error fetching todos:', error.response ? error.response.data : error.message);
//       alert(`Error fetching todos: ${error.response ? error.response.data : error.message}`);
//     }
//   };

//   // Update input value
//   onChangeValue = (event) => {
//     this.setState({ todoList: event.target.value });
//   };

//   // Add or update a todo
//   addTodo = async (event) => {
//     event.preventDefault();
//     const { todoList, storeTodo, isEditing, editingId } = this.state;

//     if (isEditing) {
//       // Edit existing todo
//       try {
//         const response = await axios.put(`http://localhost:8080/api/todos/${editingId}`, { todo: todoList });
//         const updatedTodos = storeTodo.map(todo => (todo.id === editingId ? response.data : todo));
//         this.setState({
//           storeTodo: updatedTodos,
//           todoList: '',
//           isEditing: false,
//           editingId: null,
//         });
//         this.toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Todo Updated' });
//       } catch (error) {
//         console.error('Error updating todo:', error);
//         alert(`Error updating todo: ${error.message}`);
//       }
//     } else {
//       // Add new todo
//       try {
//         const response = await axios.post('http://localhost:8080/api/todos', { todo: todoList });
//         this.setState((prevState) => ({
//           storeTodo: [...prevState.storeTodo, response.data],
//           todoList: '',
//         }));
//         this.toast.current.show({ severity: 'success', summary: 'Success', detail: 'Todo Added' });
//       } catch (error) {
//         console.error('Error adding todo:', error);
//         alert(`Error adding todo: ${error.message}`);
//       }
//     }
//   };

//   // Delete a todo
//   onDelete = async (deleteId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/todos/${deleteId}`);
//       const updatedTodos = this.state.storeTodo.filter(todo => todo.id !== deleteId);
//       this.setState({ storeTodo: updatedTodos });
//       this.toast.current.show({ severity: 'warn', summary: 'Deleted', detail: 'Todo Deleted' });
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//       alert(`Error deleting todo: ${error.message}`);
//     }
//   };

//   // Set todo for editing
//   editTodo = (id) => {
//     const { storeTodo } = this.state;
//     const todoEdited = storeTodo.find(each => each.id === id);

//     if (todoEdited) {
//       this.setState({ 
//         editingId: id, 
//         todoList: todoEdited.todo,
//         isEditing: true 
//       });
//     }
//   };

//   render() {
//     const { todoList, storeTodo, isEditing } = this.state;

//     return (
//       <div className='changes'>
//         <div>
//           <h1>Todo List</h1>
//           <form onSubmit={this.addTodo}>
//             <div className="make">
//               <input
//                 className='check'
//                 type="text"
//                 value={todoList}
//                 onChange={this.onChangeValue}
//                 placeholder="Add a Value"
//               />
//               <div className="move">
//                 <Button label={isEditing ? "Update Todo" : "Add Todo"} type='submit' disabled={todoList === ''} />
//               </div>
//             </div>
//           </form>
//           <Toast ref={this.toast} />
//           <ul>
//             {storeTodo.map(each => (
//               <li key={each.id} className='styles'>
//                 <div className="edit">
//                   <p>{each.todo}</p>
//                   <Button label="Delete" severity="danger" onClick={() => this.onDelete(each.id)} />
//                   <Button label="Edit" severity="secondary" onClick={() => this.editTodo(each.id)} />
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     );
//   }
// }

// export default SimpleTodos;



import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import './index.css';

class SimpleTodos extends Component {
  state = {
    todoList: '',
    storeTodo: [],
    id: 0,
    isEditing: false,
    editingId: null,
    sorting: true
  };

  toast = React.createRef(); 

  onChangeValue = (event) => {
    this.setState({ todoList: event.target.value });
  };

  addTodo = (event) => {
    event.preventDefault();
    const { todoList, storeTodo, id, isEditing, editingId } = this.state;
    const currentDate = new Date().toLocaleString();

    if (isEditing) {
      const updatedTodos = storeTodo.map(todo =>
        todo.id === editingId ? { ...todo, todo: todoList, date: currentDate} : todo
      );

      this.setState({
        storeTodo: updatedTodos,
        todoList: '',
        isEditing: false,
        editingId: null,
      });

      this.toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Todo Updated' });
    } else {
      const newTodo = { id: id, todo: todoList, date: currentDate};
      this.setState((prevState) => ({
        storeTodo: [...prevState.storeTodo, newTodo],
        todoList: '',
        id: prevState.id + 1,
      }), 
      this.toast.current.show({ severity: 'success', summary: 'Success', detail: todoList }));
    }
  };

  onDelete = (deleteId) => {
    const { storeTodo } = this.state;
    const updatedTodos = storeTodo.filter(each => each.id !== deleteId);
    this.setState({ storeTodo: updatedTodos });
    this.toast.current.show({ severity: 'warn', summary: 'Deleted', detail: 'Todo Deleted' });
  };

  editTodo = (id) => {
    const { storeTodo } = this.state;
    const todoEdited = storeTodo.find(each => each.id === id);
    
    if (todoEdited) {
      this.setState({ 
        editingId: id, 
        todoList: todoEdited.todo,
        isEditing: true 
      });
    }
  };

  clearAllTodos = () => {
    this.setState({storeTodo: []});
    this.toast.current.show({ severity: 'info', summary: 'Cleared', detail: 'All Todos Cleared' });
  }

  sortTodosAscending = () => {
    const { storeTodo, sorting} = this.state;
    if(sorting){
      const sortedTodos = [...storeTodo].sort((a, b) => a.todo.localeCompare(b.todo));

    this.setState({ storeTodo: sortedTodos, sorting: false });

    this.toast.current.show({ severity: 'info', summary: 'Sorted', detail: 'Sorted in Ascending Order' });
    } else{
      const sortedTodos = [...storeTodo].sort((a, b) => b.todo.localeCompare(a.todo));

    this.setState({ storeTodo: sortedTodos, sorting: true});

    this.toast.current.show({ severity: 'info', summary: 'Sorted', detail: 'Sorted in Desscending Order' });
    }
  };

  render() {
    const { todoList, storeTodo, isEditing} = this.state;
    return (
      <div className='changes'>
        <div className='editSec'>
          <h1>Todo List</h1>
          <div className='movements'>
          <form onSubmit={this.addTodo}>
            <div className="make">
              <input
                className='check'
                type="text"
                value={todoList}
                onChange={this.onChangeValue}
                placeholder="Add a Value"
              />
              <div className="move">
                <Button label={isEditing ? "Update Todo" : "Add Todo"} type='submit' disabled={todoList === ''} />
                </div>
            </div>
          </form>
          <Toast ref={this.toast} />
          <div className="clear-all-container">
            <Button label="Clear All" severity="danger" onClick={this.clearAllTodos} className='clear-all-button'/>
          </div>

          <div className="clear-all-container">
              <Button label="Sort" severity="help" onClick={this.sortTodosAscending} className='clear-all-button'/>
            </div>

        </div>
          <div className='makeChanges'>
          <ul>
            {storeTodo.map(each => (
              <li key={each.id} className='styles'>
                <div className="edit">
                  <p className='editPara'>{each.todo}</p>
                  <p><small>Added on: {each.date}</small></p>
                  <Button label="Delete" severity="danger" onClick={() => this.onDelete(each.id)} className='moveButton'/>
                  <Button label="Edit" severity="secondary" onClick={() => this.editTodo(each.id)} className='moveButton'/>
                </div>
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SimpleTodos;



