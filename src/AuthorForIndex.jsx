const RecordCard = ({ simpleTitle, coverPhoto, synopsis, description }) => {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      border: "black solid",
      borderWidth: "1.5px",
      borderRadius: "25px",
      padding: "1rem",
    }}>
      <div dangerouslySetInnerHTML={{ __html: simpleTitle }} />
      <div style={{ display: "flex", position: "relative", overflow: "hidden" }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1",
          margin: "1rem"
        }}>
          {coverPhoto &&
            <img
            src={coverPhoto.thumbnails.large.url}
            alt={coverPhoto.filename}
            height="150" />
          }
        </div>
        <div style={{ flex: "3", position: "relative" }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "101%",
            pointerEvents: "none",
            background: "linear-gradient(to bottom, transparent, white)"
          }}>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div dangerouslySetInnerHTML={{ __html: synopsis }} />
            <div style={{ fontFamily: "Consolas", fontSize: "small" }} dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>
      <div style={{
        display: "flex",
        backgroundColor: "white",
        justifyContent: "center",
        marginTop: "0.5rem",
      }}>
        <button>SHOW MORE</button>
      </div>
    </div>

  )
};

const BlackBox = ({ box, authors }) => {
  const tagCloud = [box.year].concat(box.tags, authors, box.associationNames);

  return (
    <div style={{ display: "flex", height: "20rem", marginBottom: "1rem" }}>
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
          tagCloud.map((tag, i) =>
          <li style={{ fontFamily: "Consolas", color: "white", backgroundColor: "black", margin: "0.5rem" }} key={i}>
            {tag}
          </li>)
        }
        </ul>
      </div>
    </div>
  )
};

const AuthorForIndex = ({ authorWithBlackBoxes }) => {
  const { authorSortNames, authorNames, blackBoxes } = authorWithBlackBoxes;

  return (
    <div style={{ display:"flex", flexDirection: "column" }}>
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