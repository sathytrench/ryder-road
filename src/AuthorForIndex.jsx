const RecordCard = ({ box }) => {
  return (
    <div style={{ border:"black solid", borderWidth:"1.5px", borderRadius:"25px", height:"300px"}}>
      <div>
        {box.simpleTitle || "Simple Title Coming Soon"}
      </div>
    </div>

  )
};

const BlackBox = ({ box }) => {
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
      <RecordCard box={box} />
    </div>
  )
};

const AuthorForIndex = ({ authorWithBlackBoxes }) => {
  return (
    <div>
      {authorWithBlackBoxes.authorNames.map((name, i) =>
        <div key={i}>
          <p>{name}</p>
        </div>
      )}
      {authorWithBlackBoxes.blackBoxes.map((box, i) =>
        <BlackBox key={i} box={box}/>
      )}
    </div>
  )
};

export { AuthorForIndex };