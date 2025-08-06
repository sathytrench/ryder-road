const TagCloud = ({ tagCloud }: { tagCloud: string[]}) => {
  return (
    <ul style={{
      display: "flex",
      flexWrap: "wrap",
      listStyle: "none",
      padding: "1rem"
    }}>
      {tagCloud.length &&
        tagCloud.map((tag, i) =>
          <li style={{
            fontFamily: "Consolas",
            fontSize: "small",
            margin: "0.5rem"
          }}
            key={i}>
            <a
              href={`/?keyword=${tag}`}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", backgroundColor: "black", color: "white", fontFamily: "Arial" }}
              aria-label="Individual record view"
            >{tag}</a>
          </li>)
      }
    </ul>
  )
}

export { TagCloud };