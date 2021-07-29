import axios from 'axios';
import React from 'react';

const TodoObject = ({ todo, setIsModalActive, setEditTitle, setEditCompleted, setEditId, assignee }) => {
    const deleteById = async () => {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/todos/:${todo.id}`);
        console.log(response);
    }
    const EditById = () => {
        setEditTitle(todo.title);
        setEditCompleted(todo.completed);
        setIsModalActive(true);
        setEditId(todo.id);
    }
    return (
        <tr className="app__body-row">
            <td className="app__body-col -id">{todo.id}</td>
            <td className="app__body-col -title">{todo.title}</td>
            <td className="app__body-col -assignee">{assignee}</td>
            <td className="app__body-col -status">{todo.completed ? 'Done' : 'In Progress'}</td>
            <td className="app__body-col -action">
                <button className="app__btn-edit" onClick={EditById}>Edit</button>
                <button className="app__btn-delete" onClick={deleteById}>Delete</button>
            </td>
        </tr>
    )
}
export default TodoObject;