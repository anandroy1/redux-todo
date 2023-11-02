import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo, setTodos } from '../features/todo/todoSlice';
import '../assets/todo.css'


const Todos = () => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [editTexts, setEditTexts] = useState(todos.map(() => ''));

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        if (storedTodos) {
            dispatch(setTodos(storedTodos));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    const handleUpdate = (todo, index) => {
        const newText = editTexts[index];
        if (newText.trim() !== '') {
            dispatch(updateTodo({
                id: todo.id,
                newText,
            }));
            // Reset editText for the specific todo item
            editTexts[index] = '';
            setEditTexts([...editTexts]);
        }
    };

    return (
        <>
            <div className="todos-container">
                <div className="todos-title">Todos</div>
                <ul className="todos-list">
                    {todos.map((todo, index) => (
                        <li key={todo.id} className="todo-item">
                            {todo.text}
                            <button
                                onClick={() => dispatch(removeTodo(todo.id))}
                                className="remove-button">
                                X
                            </button>

                            <input
                                type="text"
                                value={editTexts[index]}
                                onChange={(e) => {
                                    editTexts[index] = e.target.value;
                                    setEditTexts([...editTexts]);
                                }}
                                className="edit-input"
                            />
                            <button onClick={() => handleUpdate(todo, index)} className="update-button">Update</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Todos;
