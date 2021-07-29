import React, {useState, useEffect} from 'react';
import '../styles/pagination/pagination.css';

const Pagination = ({pagesNum, setCurrentPage}) => {
    const[currentButton, setCurrentButton] = useState(1);
    const pagesArray = [];
    for(let i= 1; i<=pagesNum; i++) {
        pagesArray.push(i);
    }
    useEffect(() => {
        setCurrentPage(currentButton);
    }, [currentButton, setCurrentPage])
    return (
        <div className="pagination">
            <ul className="pagination__list">
                <li className="pagination__item">
                    <a href="#!" className={`pagination__btn ${currentButton === 1 ? "-disabled" : ""}`} onClick={() => setCurrentButton(currentButton === 1 ? currentButton : currentButton - 1)}>Previous</a>
                </li>
                {pagesArray.map(page => {
                    return(
                        <li className={`pagination__item ${currentButton === page ? "-active" : ""}`} key={page}>
                            <a href="#!" className="pagination__link" onClick={() => setCurrentButton(page)}>{ page }</a>
                        </li>
                    )
                })}
                <li className="pagination__item">
                    <a href="#!" className={`pagination__btn ${currentButton === pagesNum ? "-disabled" : ""}`} onClick={() => setCurrentButton(currentButton === pagesNum ? currentButton : currentButton + 1)}>Next</a>
                </li>
            </ul>
        </div>
    )
}
export default Pagination;
