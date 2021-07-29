import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoObject from './TodoObject';
import Pagination from './Pagination';
import arrowDown from '../icons/arrow-down.png';
import EditModal from './EditModal';
const Dashboard = () => {
    const [todosData, setTodosData] = useState([]);
    const [users, setUsers] = useState([]);
    const [pagesNum, setPagesNum] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSort, setCurrentSort] = useState(true);
    const [editId, setEditId] = useState();
    const [editTitle, setEditTitle] = useState();
    const [editCompleted, setEditCompleted] = useState();
    const [isModalActive, setIsModalActive] = useState(false);
    const todosPerPage = 10;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todosData.slice(indexOfFirstTodo, indexOfLastTodo);

    useEffect(() => {
        async function fetchTodos() {
            const result = await axios.get('https://jsonplaceholder.typicode.com/todos');
            setTodosData(result.data);
            setPagesNum(Math.ceil(result.data.length / 10));
        }
        async function fetchUsers() {
            const result = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(result.data);
        }
        fetchTodos();
        fetchUsers();
    }, []);

    useEffect(() => {
        if (currentSort) {
            todosData.reverse();
            return;
        }
        // eslint-disable-next-line eqeqeq
        setTodosData(todosData.sort((a, b) => a.completed > b.completed ? -1 : a.completed == b.completed ? 0 : 1));
        // When you click first time sort by status button It doesn't work but after first time it works. I need to review this sort method.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSort])

    // Sort by Status if in progress or done
    const sortByStatus = (e) => {
        setCurrentSort(!currentSort);
        if (e.target.classList.contains('-up')) {
            e.target.classList.remove('-up');
            return;
        }
        e.target.classList.add('-up');
    }

    return (
        <>
            <h1 className="app__title">Dashboard</h1>
            <table className="app__table">
                <thead className="app__header">
                    <tr className="app__header-row">
                        <th className="app__header-col -id">#</th>
                        <th className="app__header-col -title">Title</th>
                        <th className="app__header-col -assignee">Assignee</th>
                        <th className="app__header-col -status">
                            Status
                            <img src={arrowDown} className="app__arrow" alt="arrow_down" onClick={sortByStatus} />
                        </th>
                        <th className="app__header-col -action">Action</th>
                    </tr>
                </thead>
                <tbody className="app__body">
                    {currentTodos.map(todo => {
                        // eslint-disable-next-line eqeqeq
                        const todoUser = users.find(user => user.id == todo.userId) || 'todoUser';
                        const assignee = todoUser.name;
                        return (
                            <TodoObject todo={todo} key={todo.id} setIsModalActive={setIsModalActive}
                                setEditCompleted={setEditCompleted} setEditTitle={setEditTitle} setEditId={setEditId} assignee={assignee} />
                        )
                    })}
                </tbody>
            </table>
            <Pagination pagesNum={pagesNum} setCurrentPage={setCurrentPage} />
            <EditModal editTitle={editTitle} editCompleted={editCompleted}
                setEditTitle={setEditTitle} setEditCompleted={setEditCompleted}
                isModalActive={isModalActive} setIsModalActive={setIsModalActive} editId={editId} />
        </>
    )
}

export default Dashboard;
