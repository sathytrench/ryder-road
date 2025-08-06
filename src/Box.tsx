import { useState, useEffect } from 'react';
import { useLocation } from "wouter";

import { convertFromRichText } from './utils/convertFromRichText';
import { buildBlackBoxWithPeople } from './utils/buildBlackBoxWithPeople';
import { getBlackBox } from './api/getData';
import { Spinner } from './components/Spinner';
import { TagCloud } from './components/TagCloud';
import { DesktopImageCarousel } from './components/DesktopImageCarousel';
import { MobileImageCarousel } from './components/MobileImageCarousel';
import { usePeople } from './context/PeopleContext';
import { useViewport } from './context/ViewportContext';
import { IndividualBlackBoxForFrontEnd, IndividualBlackBoxRecordData, PhotoFromAirtableAPI } from './types';

const Box = ({ id } : { id: string }) => {
  const [, navigate] = useLocation();
  const [record, setRecord] = useState<IndividualBlackBoxForFrontEnd | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<PhotoFromAirtableAPI[] | []>([]);
  const [tagCloud, setTagCloud] = useState<string[] | []>([]);

  const { peopleDict } = usePeople()
  const { isMobileView } = useViewport()

  useEffect(() => {
    if (Object.keys(peopleDict).length) {
      const fetchBlackBox = async () => {
        const response = await getBlackBox(id);

        if (response.status === 200) {
          setRecord(buildBlackBoxWithPeople(response.data as IndividualBlackBoxRecordData, peopleDict));
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
    // TO DO: if we are checking for a record before we ever set loading to false, do we need safeguard in TSX?
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
    <div style={{ display:"flex", justifyContent:"center"}}>
      {isLoading
        ? <Spinner />
        : <div style={{  width: "100vw", padding: "1rem" }}>
          {record
          ? <><div style={{ margin: "2rem 0" }}>
              <header>
                <div dangerouslySetInnerHTML={{ __html: convertFromRichText(record.simpleTitle) || "" }} />
              </header>
              <div style={{ display: "flex", flexDirection: isMobileView ? "column" : "row" }}>
                {images.length > 0 &&
                  <div style={{ flex: "5", marginTop: "2rem" }}>
                    {isMobileView
                      ? <MobileImageCarousel images={images} />
                      : <DesktopImageCarousel images={images} />}
                  </div>}
                <div style={{ display: "flex", alignItems: "start", flex: "1", height: "inherit" }}>
                  <TagCloud tagCloud={tagCloud} />
                </div>
              </div>
            </div><div dangerouslySetInnerHTML={{ __html: convertFromRichText(record.synopsis) || "" }} /><div style={{ margin: "0 2rem", fontFamily: "Arial" }}
              dangerouslySetInnerHTML={{ __html: convertFromRichText(record.description) || "" }} /><div style={{ margin: "0 4rem", fontFamily: "Arial" }}
                dangerouslySetInnerHTML={{ __html: convertFromRichText(record.additionalInscriptions) || "" }} /><div style={{ display: "flex", margin: "2rem 0" }}>
                <div style={{ flex: 2 }}>Catalog notes</div>
                <div style={{ flex: 5 }} dangerouslySetInnerHTML={{ __html: convertFromRichText(record.catalogNotes) || "" }} />
              </div><div style={{ display: "flex", margin: "2rem 0" }}>
                <div style={{ flex: 2 }}>References</div>
                <div style={{ flex: 5 }}>
                  {record.referenceLibraryShortTitles &&
                    record.referenceLibraryShortTitles.map((title, i) => <div key={i}>{title}</div>)}
                </div>
              </div><div>{record.rpbb}</div><div style={{ margin: "2rem 0" }}>Catalogued by {record.cataloger}</div></>
          : <>Record not found.</>}
        </div>
      }
    </div>
  );
}

export { Box };