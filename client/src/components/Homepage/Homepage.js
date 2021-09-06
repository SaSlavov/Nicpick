import React from 'react';
import Dropdown from '../Search/SearchComponents/Dropdown/Dropdown.js';
import { sortBy} from '../../actions/'
import './Homepage.css'
import List from '../List/List.js';

const Homepage = () => {
    return (
        <div className="homepage-container">

            <div className="sortBy-container">
                <Dropdown name="sorting" items={[{ data: "popularity.desc", name: "Popularity Desc." }, { data: "popularity.asc", name: "Popularity Asc." }, { data: "vote_average.desc", name: "Rating Desc." }, { data: "vote_average.asc", name: "Rating Asc." }]} action={sortBy} />
            </div>
            <List></List>
        </div>
    );
};

export default Homepage;