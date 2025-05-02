import { useState, useEffect } from 'react';
import { AuthorForIndex } from './AuthorForIndex';
import { getPeople, getBlackBoxes } from './api/getData';
import { buildAuthorsWithBlackBoxes } from './utils/buildAuthorsWithBlackBoxes';
import { useLocation } from "wouter";

const Home = () => {
  const [blackBoxes, setBlackBoxes] = useState([]);
  const [authorsLookup, setAuthorsLookup] = useState({});
  const [authorsLookupHasLoaded, setAuthorsLookupHasLoaded] = useState(false);
  const [authorsWithBlackBoxes, setAuthorsWithBlackBoxes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [location, navigate] = useLocation();

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
      } else if (response.status === 500) {
        navigate("/500");
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
      } else if (response.status === 500) {
        navigate("/500");
      } else {
        console.error(response.message);
      }
    }

    fetchBlackBoxes();
  }, [authorsLookup])

  useEffect(() => {
    if (authorsLookupHasLoaded) {
      setAuthorsWithBlackBoxes(buildAuthorsWithBlackBoxes(blackBoxes, authorsLookup));
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
