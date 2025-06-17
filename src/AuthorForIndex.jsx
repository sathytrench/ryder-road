import { useContext } from 'react';

import { BlackBoxForDesktopIndex } from "./BlackBoxForDesktopIndex";
import { BlackBoxForMobileIndex } from "./BlackBoxForMobileIndex";
import { IsMobileContext } from './App';

const AuthorForIndex = ({ authorWithBlackBoxes }) => {
  const { authorSortNames, authorNames, blackBoxes } = authorWithBlackBoxes;
  const isMobile = useContext(IsMobileContext);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {authorSortNames.map((name, i) =>
        <div className="author-name-container" key={i} style={{ display: "flex" }}>
          <p>{name}</p>
        </div>
      )}
      {isMobile
        ? blackBoxes.map((box, i) =>
          <BlackBoxForMobileIndex key={i} box={box} authors={authorNames} />
        ) : blackBoxes.map((box, i) =>
          <BlackBoxForDesktopIndex key={i} box={box} authors={authorNames} />
      )}
    </div>
  )
};

export { AuthorForIndex };