import { AuthorForIndex } from './AuthorForIndex';
import { AuthorWithBlackBoxes } from './types';

const BlackBoxIndex = ({ authorsWithBlackBoxes } : { authorsWithBlackBoxes: AuthorWithBlackBoxes[] }) => {
  return (
    <div style={{ display: "flex-column", padding: "1em" }}>
      {authorsWithBlackBoxes.map((author, i) => <AuthorForIndex authorWithBlackBoxes={author} key={i} />)}
    </div>
  )
}

export { BlackBoxIndex };