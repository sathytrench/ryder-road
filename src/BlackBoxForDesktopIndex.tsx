import { TagCloud } from "./components/TagCloud";
import { RecordCard } from "./RecordCard";
import { BlackBoxForIndexFrontend } from "./types";

const BlackBoxForDesktopIndex = (
  { box, authors }: { box: BlackBoxForIndexFrontend, authors: string[]}
) => {
  const tagCloud = [box.year].concat(box.tags, authors, box.associationNames);

  return (
    <div style={{ display: "flex", height: "20rem", marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "right", flex: "1", height: "inherit" }}>
        {box.blackBoxPhoto &&
          <div style={{ display: "flex", justifyContent: "right", margin:"0 1rem 1rem 1rem" }}>
            <img
              src={box.blackBoxPhoto.thumbnails.large.url}
              alt={box.blackBoxPhoto.filename}
              style={{ height: "inherit" }} />
          </div>
        }
      </div>
      <div style={{ display: "flex", flex: "3", height: "inherit" }}>
        <RecordCard
          id={box.id}
          simpleTitle={box.simpleTitle}
          coverPhoto={box.coverPhoto}
          synopsis={box.synopsis}
          description={box.description}
        />
      </div>
      <div style={{ display: "flex", alignItems: "end", flex: "1", height: "inherit" }}>
        <TagCloud tagCloud={tagCloud} />
      </div>
    </div>
  )
};

export { BlackBoxForDesktopIndex };