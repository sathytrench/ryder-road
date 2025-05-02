const RecordCard = ({ simpleTitle, coverPhoto, synopsis, description }) => {
  return (
    <div style={{
      display: "flex-row",
      border: "black solid",
      borderWidth: "1.5px",
      borderRadius: "25px",
      padding: "1rem",
    }}>
      <div dangerouslySetInnerHTML={{ __html: simpleTitle || "Simple Title Coming Soon" }} />
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flex:"1", margin:"1rem" }}>
          <img
            src={coverPhoto.thumbnails.large.url}
            alt={coverPhoto.filename}
            height="150" />
        </div>
        <div style={{ display: "flex-column", flex:"3" }}>
          <div style={{ display: "flex-column", overflow: "hidden" }}>
            <div dangerouslySetInnerHTML={{ __html: synopsis || "" }} />
            <div className="description-text" dangerouslySetInnerHTML={{ __html: description || "" }} />
          </div>
          <button>SHOW MORE</button>
        </div>

      </div>
    </div>

  )
};

const BlackBox = ({ box, authors }) => {
  const tagCloud = [box.year].concat(box.tags, authors, box.associationNames);

  return (
    <div style={{ display: "flex", height: "30rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "right", flex: "1", height: "inherit" }}>
        {box.blackBoxPhoto &&
          <div style={{ display: "flex", margin:"0 1rem 1rem 1rem" }}>
            <img
              src={box.blackBoxPhoto.thumbnails.large.url}
              alt={box.blackBoxPhoto.filename}
              style={{ height: "inherit" }} />
          </div>
        }
      </div>
      <div style={{ display: "flex", flex: "3", height: "inherit" }}>
        <RecordCard simpleTitle={box.simpleTitle} coverPhoto={box.coverPhoto} synopsis={box.synopsis} description={box.description} />
      </div>
      <div style={{ display: "flex", alignItems: "end", flex: "1", height: "inherit" }}>
        <ul style={{
          display: "flex",
          flexWrap: "wrap",
          listStyle: "none",
          padding: "1rem"
        }}>
        {tagCloud.length &&
          tagCloud.map((tag, i) => <li className="tag-cloud" style={{ color: "white", backgroundColor: "black", margin: "0.5rem" }} key={i}>{tag}</li>)
        }
        </ul>
      </div>
    </div>
  )
};

const AuthorForIndex = ({ authorWithBlackBoxes }) => {
  const { authorSortNames, authorNames, blackBoxes } = authorWithBlackBoxes;

  return (
    <div style={{ display:"flex-column" }}>
      {authorSortNames.map((name, i) =>
        <div key={i} style={{ marginLeft:"0", display:"flex", justifyContent:"left" }}>
          <p>{name}</p>
        </div>
      )}
      {blackBoxes.map((box, i) =>
        <BlackBox key={i} box={box} authors={authorNames} />
      )}
    </div>
  )
};

export { AuthorForIndex };