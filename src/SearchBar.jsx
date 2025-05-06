const SearchBar = () => {
  return (
    <div style={{ position: "fixed" }}>
      <label for="search" aria-hidden="true" className="sr-only">Search:</label>
      <input
        type="search"
        id="search"
        name="search"
        placeholder="Search"
        size="30" />
      <div>
        <button style={{ fontFamily: "Consolas" }}>Author <span>&#x1F50D;</span></button>
        <button style={{ fontFamily: "Consolas" }}>Title <span>&#x1F50D;</span></button>
        <button style={{ fontFamily: "Consolas" }}>Keyword <span>&#x1F50D;</span></button>
        {/* TO DO: add onclicks to each of these buttons wired to different types of searches */}
      </div>
    </div>
  )
}

export { SearchBar };