import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'wouter';

import { getBlackBoxes, searchBlackBoxes } from './api/getData';
import { buildAuthorsWithBlackBoxes } from './utils/buildAuthorsWithBlackBoxes';
import { BlackBoxIndex } from './BlackBoxIndex';
import { SearchBar } from './components/SearchBar';
import { Spinner } from './components/Spinner';
import { usePeople } from './context/PeopleContext';

const Home = () => {
  const [blackBoxes, setBlackBoxes] = useState([]);
  const [authorsWithBlackBoxes, setAuthorsWithBlackBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingFailed, setLoadingFailed] = useState(false);
  const [emptyData, setEmptyData] = useState(false);

  const [searchParams] = useSearchParams();

  const { peopleDict } = usePeople()

  useEffect(() => {
    if (peopleDict) {
      setIsLoading(true);
      setEmptyData(false);
      const fetchBlackBoxes = async () => {
        let response;

        if (searchParams.get("author")) {
          response = await searchBlackBoxes(searchParams.get("author"), [import.meta.env.VITE_AUTHOR_FIELD_ID]);
        } else if (searchParams.get("title")) {
          response = await searchBlackBoxes(searchParams.get("title"), [import.meta.env.VITE_SIMPLE_TITLE_FIELD_ID]);
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
    }
  }, [peopleDict, searchParams])

  useEffect(() => {
    if (peopleDict) {
      setAuthorsWithBlackBoxes(buildAuthorsWithBlackBoxes(blackBoxes, peopleDict));
    }
  }, [peopleDict, blackBoxes]);

  useEffect(() => {
    if (authorsWithBlackBoxes.length) {
      setIsLoading(false);
    }
  }, [authorsWithBlackBoxes]);

  return (
    <div>
      <div className="search-and-index-container" style={{ display: "flex" }}>
        <div className="search-bar-container" style={{ flex:"0.75" }}>
          <SearchBar />
        </div>
        <div style={{ flex:"2.25", display: "flex", justifyContent: "center" }}>
        {isLoading
            ? <Spinner />
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
