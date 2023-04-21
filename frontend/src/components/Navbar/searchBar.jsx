import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchBar.css";

import searchIcon from "../../assets/icons/search-purple-primary.svg";

function SearchBar() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input type="text" placeholder="Search listings..." value={searchTerm} onChange={handleInputChange} />
            <button type="submit">
                <img src={searchIcon} alt="Go"></img>
            </button>
        </form>
    );
}

export default SearchBar;
