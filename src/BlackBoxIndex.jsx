import { AuthorForIndex } from './AuthorForIndex';

const BlackBoxIndex = ({ authorsWithBlackBoxes }) => {
  return (
    <div style={{ display: "flex-column", padding: "1em" }}>
      {authorsWithBlackBoxes.map((author, i) => <AuthorForIndex authorWithBlackBoxes={author} key={i} />)}
    </div>
  )
}

export { BlackBoxIndex };