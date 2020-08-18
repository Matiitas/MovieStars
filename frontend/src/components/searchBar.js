import React, { useState } from "react";

const SearchBar = (props) => {
  const [inputSearch, setInputSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(inputSearch);
  };

  return (
    <li className="nav-searchbox">
      <form onSubmit={handleSubmit}>
        <input
          required
          type="search"
          placeholder="Search by Title"
          onChange={(e) => {
            setInputSearch(e.target.value);
          }}
        />
        <button style={{ display: "flex" }} type="submit">
          {" "}
          <span style={{ fontSize: "20px" }}>Search</span>{" "}
        </button>
      </form>
    </li>
  );
};

export default SearchBar;
