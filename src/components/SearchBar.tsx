import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from "wouter";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [, navigate] = useLocation();
  const [searchParams] = useSearchParams();

  const searchValue =
    searchParams.get("author") || searchParams.get("title") || searchParams.get("keyword") || '';

  useEffect(() => {
    setSearchTerm(searchValue);
  }, [searchValue]);

  const buttonStyle = {
    width: "30%",
    height: "2rem",
    fontFamily: "Consolas",
    margin: "0.5rem",
    borderRadius: "0",
    backgroundColor: "transparent"
  }

  return (
    <div style={{ position: "sticky", top: "0", display: "flex", flexDirection: "column" }}>
      <label htmlFor="search" aria-hidden="true" className="sr-only">Search:</label>
      <input
        style={{ height: "3rem", borderRadius: "5px", margin: "0.5rem", fontSize: "2rem" }}
        type="search"
        id="search"
        name="search"
        placeholder="Search"
        defaultValue={searchValue}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="search-button-container" style={{ display: "flex" }}>
        <button
          onClick={() => navigate(`/?author=${searchTerm}`)}
          style={buttonStyle}
        >Author <span>&#x1F50D;</span></button>
        <button
          onClick={() => navigate(`/?title=${searchTerm}`)}
          style={buttonStyle}
        >Title <span>&#x1F50D;</span></button>
        <button
          onClick={() => navigate(`/?keyword=${searchTerm}`)}
          style={buttonStyle}
        >Keyword <span>&#x1F50D;</span></button>
      </div>
    </div>
  )
}

export { SearchBar };