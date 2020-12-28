import Slider from 'rc-slider';
import React, { useRef, useState } from 'react';
import { ACTION, COMEDY, ROMANCE, THRILLER } from '../../apis/common/genres';
import './Search.css'

const Search = () => {
    const [genres, setGenres] = useState([])
    const [rating, setRating] = useState(0)
    const ratingProgress = useRef()

    const slideRating = (e) => {
        let value = e.target.value
        ratingProgress.current.style = `border-right: ${value * 20}px solid #959cfb`
        setRating(e.target.value)
    }

    return (
        <div className="search-relative-container">
            <div className="search-container" onChange={(e) => setGenres([...genres, e.target.value])}>
                <p className="search-type">Movies</p>
                <div className="genres-container">
                    <p className="filter-title">Genres</p>
                    <p className="genres-type">Action</p>
                    <p className="genres-type">Adventure</p>
                    <p className="genres-type">Animation</p>
                    <p className="genres-type">Comedy</p>
                    <p className="genres-type">Crime</p>
                    <p className="genres-type">Drama</p>
                    <p className="genres-type">Family</p>
                    <p className="genres-type">Fantasy</p>
                    <p className="genres-type">Horror</p>
                    <p className="genres-type">Romance</p>
                    <p className="genres-type">Science fiction</p>
                </div>
                <div className="rating-container">
                    <p className="filter-title">Rating</p>
                    <p className="rating-value">{rating}</p>
                    <p className="imdb">imdb</p>
                    <div className="slider-container">
                        <input className="rating-slider" type="range" min="0" max="10" step="0.5" value={rating} onChange={(e) => slideRating(e)}></input>
                    </div>
                    <div className="rating-track-filler" ref={ratingProgress} ></div>
                </div>

                <select>
                    <option value={COMEDY} >Comedy</option>
                    <option value={ROMANCE}>Romance</option>
                    <option value={ACTION}>Action</option>
                    <option value={THRILLER}>Thriller</option>
                </select>
            </div>
        </div>
    );
};

export default Search;