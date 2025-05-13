import { useState, useEffect } from 'react';
import { useSearchParams } from 'wouter';

import { getPeople, getBlackBoxes, searchBlackBoxes } from './api/getData';
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
  const [emptyData, setEmptyData] = useState(false);

  const [searchParams] = useSearchParams();

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
    setIsLoading(true);
    setEmptyData(false);
    const fetchBlackBoxes = async () => {
      let response;

      if (searchParams.get("author")) {
        response = await searchBlackBoxes(searchParams.get("author"), ["fldm2eTYoWQjhjlCI"]);
      } else if (searchParams.get("title")) {
        response = await searchBlackBoxes(searchParams.get("title"), ["flduNLVjaiAsfy87q"]);
      } else if (searchParams.get("keyword")) {
        response = await searchBlackBoxes(searchParams.get("keyword"));
      } else {
        response = await getBlackBoxes();
      }

      if (response.status === 200) {
        if (response.data.length > 0) {
          setBlackBoxes(response.data);
        } else {
          setIsLoading(false);
          setEmptyData(true);
        }
      } else {
        setLoadingFailed(true);
        setIsLoading(false);
        console.error(response.message);
      }
    }

    fetchBlackBoxes();
  }, [authorsLookup, searchParams])

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
        <div style={{ flex:"0.75" }}>
          <SearchBar />
        </div>
        <div style={{ flex:"2.25", display: "flex" }}>
        {isLoading
            ? <div>LOADING</div>
            : <div>
              {loadingFailed
                ? <div>Oops! There was a problem fetching from our server.</div>
                : <div>
                  {emptyData
                    ? <div>Oops! No records match your criteria.</div>
                    : <BlackBoxIndex authorsWithBlackBoxes={authorsWithBlackBoxes} />
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export { Home };
