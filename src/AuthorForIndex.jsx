const RecordCard = ({ simpleTitle, coverPhoto, synopsis, description }) => {
  return (
    <div style={{ border:"black solid", borderWidth:"1.5px", borderRadius:"25px", height:"300px", padding:"1rem"}}>
      <div dangerouslySetInnerHTML={{ __html: simpleTitle || "Simple Title Coming Soon" }} />
      <div style={{ display:"flex", border:"red dotted" }}>
        <img
              src={coverPhoto.thumbnails.large.url}
              alt={coverPhoto.filename}
              height="100" />
        <div style={{ display:"flex-column", overflow:"hidden", border:"blue dotted"}}>
          <div dangerouslySetInnerHTML={{ __html: synopsis || "" }} />
          <div dangerouslySetInnerHTML={{ __html: description || "" }}/>
          <button>SHOW MORE</button>
        </div>
      </div>
    </div>

  )
};

const BlackBox = ({ box, authors }) => {
  return (
    <div style={{ display:"flex" }}>
      <div style={{ height:"20rem", width:"10rem"}}>
        {box.blackBoxPhoto &&
          <img
            src={box.blackBoxPhoto.thumbnails.large.url}
            alt={box.blackBoxPhoto.filename}
            height="300" />
        }
      </div>
      <RecordCard simpleTitle={box.simpleTitle} coverPhoto={box.coverPhoto} synopsis={box.synopsis} description={box.description} />
      <div>
        <div>{box.year}</div>
        {box.tags &&
          box.tags.map((tag, i) => <div key={i}>{tag}</div>)
        }
        {authors &&
          authors.map((author, i) => <div key={i}>{author}</div>)
        }
        {box.associationNames &&
          box.associationNames.map((association, i) => <div key={i}>{association}</div>)
        }
      </div>
    </div>
  )
};

const AuthorForIndex = ({ authorWithBlackBoxes }) => {
  const { authorSortNames, authorNames, blackBoxes } = authorWithBlackBoxes;
  return (
    <div>
      {authorSortNames.map((name, i) =>
        <div key={i}>
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