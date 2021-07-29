import React from 'react';
import '../styles/modal/modal.css';
import axios from 'axios';

const EditModal = ({ editTitle, editCompleted, setEditTitle, setEditCompleted, isModalActive, setIsModalActive, editId }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.patch(`https://jsonplaceholder.typicode.com/todos/:${editId}`, { title: editTitle, completed: editCompleted });
        console.log(response);
        setIsModalActive(false);
    }
    return (
        <div className={`modal ${isModalActive ? "-active" : ""}`}>
            <form className="modal__form" onSubmit={handleSubmit}>
                <div className="modal__field">
                    <label className="modal__label -title" htmlFor="title">Title</label>
                    <input className="modal__input" type="textarea" name="title" onChange={(e) => setEditTitle(e.target.value)} value={editTitle} />
                </div>
                <div className="modal__field">
                    <input type="checkbox" onChange={(e) => setEditCompleted(e.target.value)} name="completed" checked={editCompleted ? 'checked' : ''} />
                    <label className="modal__label" htmlFor="completed">Completed</label>
                </div>
                <div className="modal__buttons">
                    <button className="modal__btn -save" type="submit">Save</button>
                    <button className="modal__btn -cancel" onClick={() => setIsModalActive(false)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}
export default EditModal;
