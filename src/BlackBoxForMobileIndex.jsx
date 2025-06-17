import { TagCloud } from "./components/TagCloud";
import { RecordCard } from "./RecordCard";

const BlackBoxForMobileIndex = ({ box, authors }) => {
  const tagCloud = [box.year].concat(box.tags, authors, box.associationNames);

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly", width: "100vw" }}>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          {box.blackBoxPhoto &&
            <img
              src={box.blackBoxPhoto.thumbnails.large.url}
              alt={box.blackBoxPhoto.filename}
              style={{ height: "25rem" }} />
          }
        </div>
        <div>
          <RecordCard
            id={box.id}
            simpleTitle={box.simpleTitle}
            coverPhoto={box.coverPhoto}
            synopsis={box.synopsis}
            description={box.description}
          />
        </div>
        <div>
          <TagCloud tagCloud={tagCloud} />
        </div>
      </div>
    </div>
  )
};

export { BlackBoxForMobileIndex };