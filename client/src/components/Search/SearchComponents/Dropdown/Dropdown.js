import React, { useRef, useState } from 'react';
import './Dropdown.css'

const Dropdown = React.memo(({ name, items, action }) => {
    const [chosenItem, setChosenItem] = useState(items[0].name)
    const countriesRef = useRef();

    const renderItems = (items, action) => {
        return items.map((item, index) => {
            return (
                <option key={index} onClick={() => {setChosenItem(item.name); action(item.data)}}>{item.name}</option>
            )
        })
    }

    return (
        <div tabIndex="0" className={`${name}-dropdown-container`} onClick={() => countriesRef.current && countriesRef.current.classList.toggle("active")}  onBlur={(e) => !(e.relatedTarget && e.relatedTarget.className === `${name}-dropdown-container`) && countriesRef.current.classList.length > 1 && countriesRef.current.classList.toggle('active')}>
            <svg className="dropdown-arrow" height="13" width="13" viewBox="0 0 213.333 213.333" xmlns="http://www.w3.org/2000/svg" ><path d="M0 53.333L106.667 160 213.333 53.333z"/></svg>
            <p className="dropdown-name"  >{chosenItem}</p>
            <div ref={countriesRef} className="dropdown-options">
                {renderItems(items, action)}
            </div>
        </div>
    );
});

export default Dropdown;