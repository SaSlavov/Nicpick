import React, { useState } from 'react';
import { connect } from 'react-redux';
import Search from '../Search/Search';
import './SideBar.css'
import { searchMovies, searchSeries } from '../../actions'

const SideBar = (props) => {
    const [active, setActive] = useState({
        movies: false,
        series: false
    })

    return (
        <div className="sidebar-container">
            <div className="sidebar-buttons">
                <div className="film-svg-container" onClick={() => props.searchMovies({type: "movies", active: !props.activeSearch.active})}><svg className="film-svg" height="70" width="70" viewBox="-160 -140 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M192 96c0-53.02-42.98-96-96-96S0 42.98 0 96s42.98 96 96 96h96v-16h-43a95.986 95.986 0 0043-80zm-48.977 64.723c-10.722 7.789-25.734 5.414-33.523-5.313-7.79-10.722-5.414-25.73 5.309-33.523 10.726-7.79 25.734-5.414 33.523 5.312 7.793 10.723 5.414 25.73-5.309 33.524zm-1.18-104.852c12.606-4.098 26.145 2.8 30.243 15.406 4.094 12.61-2.805 26.149-15.41 30.243-12.606 4.097-26.145-2.801-30.242-15.407-4.094-12.605 2.804-26.148 15.41-30.242zM96 16c13.254 0 24 10.746 24 24s-10.746 24-24 24-24-10.746-24-24 10.746-24 24-24zM19.914 71.277c4.098-12.605 17.637-19.504 30.242-15.41 12.606 4.098 19.504 17.637 15.41 30.242-4.097 12.606-17.636 19.504-30.242 15.41S15.82 83.888 19.914 71.278zM82.5 155.41c-7.79 10.727-22.8 13.102-33.523 5.313-10.723-7.793-13.102-22.801-5.309-33.524 7.789-10.722 22.8-13.101 33.523-5.308 10.723 7.789 13.098 22.796 5.309 33.52zM88 96a8 8 0 1116 0 8 8 0 01-16 0zm0 0" /></svg></div>

            </div>
            <Search active={props.activeSearch.active} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
       activeSearch: state.activeSearch
    }
}

export default connect(
    mapStateToProps,
    { searchMovies, searchSeries }
)(SideBar)