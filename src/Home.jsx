import { useState, useEffect } from 'react';

import { getPeople, getBlackBoxes } from './api/getData';
import { buildAuthorsWithBlackBoxes } from './utils/buildAuthorsWithBlackBoxes';
import { BlackBoxIndex } from './BlackBoxIndex';
import { SearchBar } from './SearchBar';

const Home = () => {
  const [blackBoxes, setBlackBoxes] = useState([]);
  const [authorsLookup, setAuthorsLookup] = useState({});
  const [authorsLookupHasLoaded, setAuthorsLookupHasLoaded] = useState(false);
  const [authorsWithBlackBoxes, setAuthorsWithBlackBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await getPeople();

      if (response.status === 200) {
        const authorsAsDict = {};
        response.data.forEach(person => {
          authorsAsDict[person.id] = { sort: person.sort, name: person.name };
        })
        setAuthorsLookup(authorsAsDict);
        setAuthorsLookupHasLoaded(true);
      } else {
        setLoadingFailed(true);
        setIsLoading(false);
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
        setLoadingFailed(true);
        setIsLoading(false);
        console.error(response.message);
      }
    }

    fetchBlackBoxes();
  }, [authorsLookup])

  useEffect(() => {
    if (authorsLookupHasLoaded) {
      setAuthorsWithBlackBoxes(buildAuthorsWithBlackBoxes(blackBoxes, authorsLookup));
    }
  }, [authorsLookup, authorsLookupHasLoaded, blackBoxes]);

  useEffect(() => {
    if (authorsWithBlackBoxes.length) {
      setIsLoading(false);
    }
  }, [authorsWithBlackBoxes]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex:"1" }}>
          <SearchBar />
        </div>
        <div style={{ flex:"2" }}>
        {isLoading
          ? <div>LOADING</div>
          : <div>
            {loadingFailed
              ? <div>Oops! There was a problem fetching from our server.</div>
              : <BlackBoxIndex authorsWithBlackBoxes={authorsWithBlackBoxes}/>}
            </div>
        }
        </div>
      </div>
    </div>
  )
}

export { Home };
