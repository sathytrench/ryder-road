import { useState, useEffect } from 'react';
import { AuthorForIndex } from './AuthorForIndex';
import { getPeople, getBlackBoxes } from './api/getData';

const Home = () => {
  const [blackBoxes, setBlackBoxes] = useState([]);
  const [authorsLookup, setAuthorsLookup] = useState({});
  const [authorsLookupHasLoaded, setAuthorsLookupHasLoaded] = useState(false);
  const [authorsWithBlackBoxes, setAuthorsWithBlackBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await getPeople();
      if (response.status === 200) {
        const authorsAsDict = {};
        response.data.forEach(person => {
          authorsAsDict[person.id] = person.authorSortName;
        })
        setAuthorsLookup(authorsAsDict);
        setAuthorsLookupHasLoaded(true);
      } else {
        console.error(response.message);
      }
    }

    fetchPeople();
  }, []);

  useEffect(() => {
    const fetchBlackBoxes = async () => {
      const response = await getBlackBoxes();

      if (response.status === 200) {
        setBlackBoxes(response.data);
      } else {
        console.error(response.message);
      }
    }

    fetchBlackBoxes();
  }, [authorsLookup])

  useEffect(() => {
    if (authorsLookupHasLoaded) {
      let tempAuthorsWithRecords = [];
      blackBoxes.forEach(box => {
        const authorIds = box.authors;
        let authorNames = [];
        authorIds.forEach(id => {
          const authorName = authorsLookup[id];
          authorNames.push(authorName);
        });
        const authorNamesKey = authorNames.toString();
        if (tempAuthorsWithRecords.findIndex(element => element.authorNamesKey === authorNamesKey) > -1) {
          tempAuthorsWithRecords[tempAuthorsWithRecords.findIndex(element => element.authorNamesKey === authorNamesKey)].blackBoxes.push(box);
        } else {
          tempAuthorsWithRecords.push({ authorNamesKey, authorNames, blackBoxes: [box] });
        }
      })

      setAuthorsWithBlackBoxes(tempAuthorsWithRecords);
    }
  }, [blackBoxes]);

  useEffect(() => {
    if (authorsWithBlackBoxes.length) {
      setIsLoading(false);
    }
  }, [authorsWithBlackBoxes]);

  return (
    <div>
      <header>Black Boxes</header>
      {isLoading
        ? <div>LOADING</div>
        : <div>
            {authorsWithBlackBoxes.map((author, i) => <AuthorForIndex authorWithBlackBoxes={author} key={i}/>)}
          </div>
      }
    </div>
  )
}

export { Home };
