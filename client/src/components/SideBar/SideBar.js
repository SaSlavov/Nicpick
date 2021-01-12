import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import Search from '../Search/Search';
import './SideBar.css'
import { searchMovies, searchSeries, setResult } from '../../actions'

const SideBar = (props) => {
    const tvButtonRef = useRef()

    const returnCurrentPosition = () => {
        // props.activeSearch.type === 'movie' ? 'before' : props.activeSearch.type === 'tv' ? '' : 'after'
        if (props.activeSearch.type === 'movie') {
            return 'before';
        } else if (props.activeSearch.type === 'tv') {
            return '';
        } else if (props.activeSearch.type === 'favorites') {
            return 'after';
        } else {
            return tvButtonRef.current.classList[1];
        }
    }

    return (
        <div className="sidebar-container">
            <div className="sidebar-buttons">
                {/* <div className={`film-svg-container ${props.activeSearch.type === 'movie' ? 'active' : ''} ${props.activeSearch.type === 'tv' ? 'down' : 'up'}`} */}
                <div className='film-svg-container'
                    onClick={() => { props.searchMovies({ type: "movie", active: props.activeSearch.type === "tv" ? props.activeSearch.active : !props.activeSearch.active }); props.setResult([props.search, 'movie']) }}>
                    <svg className="film-svg" height="70" width="70" viewBox="-160 -140 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M192 96c0-53.02-42.98-96-96-96S0 42.98 0 96s42.98 96 96 96h96v-16h-43a95.986 95.986 0 0043-80zm-48.977 64.723c-10.722 7.789-25.734 5.414-33.523-5.313-7.79-10.722-5.414-25.73 5.309-33.523 10.726-7.79 25.734-5.414 33.523 5.312 7.793 10.723 5.414 25.73-5.309 33.524zm-1.18-104.852c12.606-4.098 26.145 2.8 30.243 15.406 4.094 12.61-2.805 26.149-15.41 30.243-12.606 4.097-26.145-2.801-30.242-15.407-4.094-12.605 2.804-26.148 15.41-30.242zM96 16c13.254 0 24 10.746 24 24s-10.746 24-24 24-24-10.746-24-24 10.746-24 24-24zM19.914 71.277c4.098-12.605 17.637-19.504 30.242-15.41 12.606 4.098 19.504 17.637 15.41 30.242-4.097 12.606-17.636 19.504-30.242 15.41S15.82 83.888 19.914 71.278zM82.5 155.41c-7.79 10.727-22.8 13.102-33.523 5.313-10.723-7.793-13.102-22.801-5.309-33.524 7.789-10.722 22.8-13.101 33.523-5.308 10.723 7.789 13.098 22.796 5.309 33.52zM88 96a8 8 0 1116 0 8 8 0 01-16 0zm0 0" /></svg>
                </div>

                {/* <div className={`tv-svg-container ${props.activeSearch.type === 'tv' ? 'active' : ''}`} */}
                <div ref={tvButtonRef} className={`tv-svg-container ${returnCurrentPosition()}`}
                    onClick={() => { props.searchMovies({ type: "tv", active: props.activeSearch.type === "movie" ? props.activeSearch.active : !props.activeSearch.active }); props.setResult([props.search, 'tv']) }}>
                    <svg className="tv-svg" height="70" width="70" viewBox="-250 -250 1024 1024" xmlns="http://www.w3.org/2000/svg" ><path d="M512 391V61H0v330h141v30h-40v30h310v-30h-40v-30h141zm-171 30H171v-30h170v30zM30 361V91h452v270H30z" /></svg>
                </div>

                {/* <div className={`heart-svg-container ${props.activeSearch.type === 'tv' ? 'active' : ''}`} */}
                <div className='heart-svg-container'
                    onClick={() => props.searchMovies({ type: "favorites" })}>
                    <svg className="heart-svg" width="70" height="70" viewBox="-350 -350 1248 1248" xmlns="http://www.w3.org/2000/svg" ><path d="M475.366 71.949c-24.175-23.606-57.575-35.404-100.215-35.404-11.8 0-23.843 2.046-36.117 6.136-12.279 4.093-23.702 9.615-34.256 16.562-10.568 6.945-19.65 13.467-27.269 19.556a263.828 263.828 0 00-21.696 19.414 264.184 264.184 0 00-21.698-19.414c-7.616-6.089-16.702-12.607-27.268-19.556-10.564-6.95-21.985-12.468-34.261-16.562-12.275-4.089-24.316-6.136-36.116-6.136-42.637 0-76.039 11.801-100.211 35.404C12.087 95.55 0 128.286 0 170.16c0 12.753 2.24 25.891 6.711 39.398 4.471 13.514 9.566 25.031 15.275 34.546 5.708 9.514 12.181 18.792 19.414 27.834 7.233 9.041 12.519 15.272 15.846 18.698 3.33 3.426 5.948 5.903 7.851 7.427L243.25 469.938c3.427 3.426 7.614 5.144 12.562 5.144s9.138-1.718 12.563-5.144l177.87-171.31c43.588-43.58 65.38-86.406 65.38-128.472.001-41.877-12.085-74.61-36.259-98.207zm-53.961 199.846L255.813 431.391 89.938 271.507C54.344 235.922 36.55 202.133 36.55 170.156c0-15.415 2.046-29.026 6.136-40.824 4.093-11.8 9.327-21.177 15.703-28.124 6.377-6.949 14.132-12.607 23.268-16.988 9.141-4.377 18.086-7.328 26.84-8.85 8.754-1.52 18.079-2.281 27.978-2.281 9.896 0 20.557 2.424 31.977 7.279 11.418 4.853 21.934 10.944 31.545 18.271 9.613 7.332 17.845 14.183 24.7 20.557 6.851 6.38 12.559 12.229 17.128 17.559 3.424 4.189 8.091 6.283 13.989 6.283 5.9 0 10.562-2.094 13.99-6.283 4.568-5.33 10.28-11.182 17.131-17.559 6.852-6.374 15.085-13.222 24.694-20.557 9.613-7.327 20.129-13.418 31.553-18.271 11.416-4.854 22.08-7.279 31.977-7.279s19.219.761 27.977 2.281c8.757 1.521 17.702 4.473 26.84 8.85 9.137 4.38 16.892 10.042 23.267 16.988 6.376 6.947 11.612 16.324 15.705 28.124 4.086 11.798 6.132 25.409 6.132 40.824-.002 31.977-17.89 65.86-53.675 101.639z" /></svg>
                </div>

            </div>
            <Search active={props.activeSearch.active} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        activeSearch: state.activeSearch,
        search: state.search
    }
}

export default connect(
    mapStateToProps,
    { searchMovies, searchSeries, setResult }
)(SideBar)