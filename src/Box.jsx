import { useState, useEffect, useContext } from 'react';
import { useLocation } from "wouter";

import { convertFromRichText } from './utils/convertFromRichText';
import { buildBlackBoxWithPeople } from './utils/buildBlackBoxWithPeople';
import { getBlackBox } from './api/getData';
import { PeopleContext } from './App';
import { Spinner } from './components/Spinner';
import { TagCloud } from './components/TagCloud';

const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  const handleClick = (e) => {
    if (e.target.name === "previous") {
      if (index === 0) {
        setIndex(images.length - 1);
      } else {
        setIndex(index-1);
      }
    } else {
      if (index === images.length - 1) {
        setIndex(0);
      } else {
        setIndex(index+1);
      }
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button name="previous" type="button"
          style={{ border: "none", backgroundColor: "transparent", fontSize: "2rem", cursor: "pointer", margin: "1rem" }}
          onClick={(e) => handleClick(e)}>←</button>
        <div style={{ display: "flex", flexDirection: "column", margin:"0 2rem" }}>
          <div style={{ width: "40rem", height: "30rem", display: "flex", justifyContent: "center" }}>
            <img
              style={{ height:"100%", width:"100%", objectFit:"contain" }}
              src={images[index].thumbnails.large.url}
              alt={images[index].filename} />
          </div>
          <div style={{ display:"flex", justifyContent:"center", margin:"0.5rem" }}>{index + 1}/{images.length}</div>
        </div>
        <button name="next" type="button"
          style={{ border: "none", backgroundColor: "transparent", fontSize: "2rem", cursor: "pointer", margin: "1rem" }}
          onClick={(e) => handleClick(e)}>→</button>
      </div>
    </div>
  );
}

const Box = ({ id }) => {
  const [, navigate] = useLocation();
  const [record, setRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [tagCloud, setTagCloud] = useState([]);

  const peopleDict = useContext(PeopleContext);

  useEffect(() => {
    if (peopleDict) {
      const fetchBlackBox = async () => {
        const response = await getBlackBox(id);

        if (response.status === 200) {
          setRecord(buildBlackBoxWithPeople(response.data, peopleDict));
        } else if (response.status === 500) {
          navigate("/500");
        } else {
          console.error(response.message);
        }
      }

      fetchBlackBox();

    }
  }, [id, peopleDict, navigate]);

  useEffect(() => {
    if (record) {
      const allImages = [];
      if (record.coverPhoto){
        allImages.push(record.coverPhoto);
      };
      if (record.additionalPhotos?.length){
        record.additionalPhotos.forEach(photo => allImages.push(photo));
      };

      const allTags = [];
      if (record.year){
        allTags.push(record.year);
      };
      if (record.authorNames?.length){
        record.authorNames.forEach(name => allTags.push(name));
      };
      if (record.associationNames?.length){
        record.associationNames.forEach(name => allTags.push(name));
      };

      setImages(allImages);
      setTagCloud(allTags);
      setIsLoading(false);
    }
  }, [record]);

  return (
    <div>
      {isLoading
        ? <Spinner />
        : <div>
            <div style={{ margin:"2rem 0" }}>
              <header>
              <div dangerouslySetInnerHTML={{ __html: convertFromRichText(record.simpleTitle) }} />
            </header>
            <div style={{ display: "flex" }}>
              {images.length > 0 &&
                <div style={{ flex: "5", marginTop:"2rem" }}>
                  <ImageCarousel images={images} />
                </div>
              }
              <div style={{ display: "flex", alignItems: "start", flex: "1", height: "inherit" }}>
                <TagCloud tagCloud={tagCloud} />
              </div>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: convertFromRichText(record.synopsis) }} />
          <div style={{ margin:"0 2rem", fontFamily: "Arial" }}
            dangerouslySetInnerHTML={{ __html: convertFromRichText(record.description) }} />
          <div style={{ margin:"0 4rem", fontFamily: "Arial" }}
            dangerouslySetInnerHTML={{ __html: convertFromRichText(record.additionalInscriptions) }} />
          <div style={{ display:"flex", margin: "2rem 0" }}>
            <div style={{ flex:2}}>Catalog notes</div>
            <div style={{ flex:5}} dangerouslySetInnerHTML={{ __html: convertFromRichText(record.catalogNotes) }} />
          </div>
          <div style={{ display:"flex", margin: "2rem 0" }}>
            <div style={{ flex:2}}>References</div>
            <div style={{ flex:5}}>
              {record.referenceLibraryShortTitles?.length > 0 &&
                record.referenceLibraryShortTitles.map((title, i) => <div key={i} >{title}</div>)}
            </div>
          </div>
          <div>{record.rpbb}</div>
        </div>
      }
    </div>
  );
}

export { Box };