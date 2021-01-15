import React, { useState } from 'react';
import './Header.css'
import query from '../../apis/tmbd.js'
import { setResult, searchMovies, setQueryString } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


const Header = ({ searchMovies, setQueryString, search, setResult, history }) => {

    const [query, setQuery] = useState('')

    return (
        <div className="header-container">
            <h3  onClick={() => history.push('/')}>Nicpick</h3>
            <div className="search-input-container">
                <span className="magnifying-glass-svg-container" onClick={() => { searchMovies({ type: 'query' }); setQueryString(query); setResult([search, 'query']) }}><svg className="magnifying-glass-svg" height="27px" width="27px" viewBox="0 0 511.999 511.999" xmlns="http://www.w3.org/2000/svg" ><path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z" /></svg></span>
                <form onSubmitCapture={(e) => {e.preventDefault(); searchMovies({ type: 'query' }); setQueryString(query); setResult([search, 'query']) }}>
                    <input className="search-input" placeholder="Search for movies, tv series etc." onChange={(e) => setQuery(e.target.value)}></input>

                </form>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        result: state.result.results,
        queryString: state.search.queryString,
        search: state.search,
    }
}

export default withRouter(connect(
    mapStateToProps,
    { setResult, searchMovies, setQueryString }
)(Header));