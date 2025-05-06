import { useState, useEffect } from 'react';
import { useLocation } from "wouter";

import { convertFromRichText } from './utils/convertFromRichText';
import { getBlackBox } from './api/getData';

const Box = ({ id }) => {
  const [, navigate] = useLocation();
  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlackBox = async () => {
      const response = await getBlackBox(id);

      if (response.status === 200) {
        setIsLoading(false);
        setRecord(response.data);
      } else if (response.status === 500) {
        navigate("/500");
      } else {
        console.error(response.message);
      }
    }

    fetchBlackBox();
  }, [id, navigate]);

  return (
    <div>
      {isLoading
        ? <div>LOADING</div>
        : <div>
            <header>{record.fields["Short title"]}</header>
          {record.fields["Cover photo"]?.length > 0 &&
            <img
              src={record.fields["Cover photo"][0].thumbnails.large.url}
              alt={record.fields["Cover photo"][0].filename}
              width="500" height="600" />
          }
          <div dangerouslySetInnerHTML={{ __html: convertFromRichText(record.fields["Description"]) }} />
        </div>
      }
    </div>
  );
}

export { Box };