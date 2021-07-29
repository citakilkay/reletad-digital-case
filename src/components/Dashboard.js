import React, {useState, useEffect} from 'react';
import axios from 'axios';
import arrowDown from '../icons/arrow-down.png';
const Dashboard = () => {
    const[todosData, setTodosData] = useState([]);
    useEffect(() => {
        async function fetchUsers() {
            const result = await axios.get('https://jsonplaceholder.typicode.com/todos');
            setTodosData(result.data);
        }
        fetchUsers();
    }, []);
    
    return (
        <>
            <h1 className="app__title">Dashboard</h1>
            <table className="app__table">
                <thead className="app__header">
                    <tr className="app__header-row">
                        <th className="app__header-col">#</th>
                        <th className="app__header-col">Title</th>
                        <th className="app__header-col">Assignee</th>
                        <th className="app__header-col -center">Status <img src={arrowDown} className="app__arrow" alt="arrow_down"/></th>
                        <th className="app__header-col -center">Action</th>
                    </tr>
                </thead>
                <tbody className="app__body">
                    {todosData.map(todo => {
                        return(
                            <tr className="app__body-row" key={todo.id}>
                                <td className="app__body-col">{todo.id}</td>
                                <td className="app__body-col">{todo.title}</td>
                                <td className="app__body-col">{todo.userId}</td>
                                <td className="app__body-col -center">{todo.completed ? 'Done' : 'In Progress'}</td>
                                <td className="app__body-col">
                                    <button className="app__btn-edit">Edit</button>
                                    <button className="app__btn-delete">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default Dashboard;
