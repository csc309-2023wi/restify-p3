import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import './sortbtn.css';
import ActionBtn from "../ActionBtn";



const SortBtn = ( {handleSort}) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    return (
        <>
      <div className="dropdown">
      <ActionBtn className = "purple-light dropdown_button" text="Sort By" onClick={toggleDropdown}/>  

        {isOpen && (
            <>
            <div className="dropdown_list" x-placement="bottom-start" aria-labelledby="sortDropdown" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-start">
          <a href="#" className="dropdown_item" onClick={() => handleSort('earliest_availability', 'asc')}>
            Earliest Available
          </a>
          <hr></hr>

          <a href="#" className="dropdown_item" onClick={() => handleSort('earliest_availability', 'desc')}>
            Latest Available
          </a>

          <hr></hr>

          <a href="#" className="dropdown_item" onClick={() => handleSort('rating', 'desc')}>
            Best Rated
          </a>

          <hr></hr>

          <a href="#" className="dropdown_item" onClick={() => handleSort('rating', 'asc')}>
            Worst Rated
          </a>
          </div>
          </>
        )}
      </div>
      </>
    );
  };
  
  export default SortBtn;



