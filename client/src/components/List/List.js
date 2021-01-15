import React from 'react';
import './List.css'

const List = () => {
    return (
        <div className="lists-container">
            <div className="list-container">
                <div className="list-header-container">
                    <p className="list-name">Currently Watching</p>
                </div>
                <div className="list-table-container">
                    <table className="list-table">
                        <tr >
                            <th>#</th>
                            <th>Title</th>
                            <th>Country</th>
                            <th>Year</th>
                            <th>Type</th>
                            <th>Score</th>
                            <th>Progress</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Avengers: Endgame</td>
                            <td>USA</td>
                            <td>2019</td>
                            <td>movie</td>
                            <td>8</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Avengers: Endgame</td>
                            <td>USA</td>
                            <td>2019</td>
                            <td>movie</td>
                            <td>8</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Avengers: Endgame</td>
                            <td>USA</td>
                            <td>2019</td>
                            <td>movie</td>
                            <td>8</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Avengers: Endgame</td>
                            <td>USA</td>
                            <td>2019</td>
                            <td>movie</td>
                            <td>8</td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Avengers: Endgame</td>
                            <td>USA</td>
                            <td>2019</td>
                            <td>movie</td>
                            <td>8</td>
                            <td>1</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default List;