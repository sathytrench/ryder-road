import { BlackBoxForDesktopIndex } from "./BlackBoxForDesktopIndex";
import { BlackBoxForMobileIndex } from "./BlackBoxForMobileIndex";
import { useViewport } from './context/ViewportContext';
import { AuthorWithBlackBoxes } from "./types";

const AuthorForIndex = ({ authorWithBlackBoxes }: { authorWithBlackBoxes: AuthorWithBlackBoxes }) => {
  const { authorSortNames, authorNames, blackBoxes } = authorWithBlackBoxes;
  const { isMobileView } = useViewport()

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {authorSortNames.map((name: string, i: number) =>
        <div className="author-name-container" key={i} style={{ display: "flex" }}>
          <p>{name}</p>
        </div>
      )}
      {isMobileView
        ? blackBoxes.map((box, i) =>
          <BlackBoxForMobileIndex key={i} box={box} authors={authorNames} />
        ) : blackBoxes.map((box, i) =>
          <BlackBoxForDesktopIndex key={i} box={box} authors={authorNames} />
      )}
    </div>
  )
};

export { AuthorForIndex };