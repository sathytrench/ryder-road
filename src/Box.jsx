import Airtable from 'airtable';
import { useState, useEffect } from 'react';

import { convertFromRichText } from './utils/convertFromRichText';

const Box = ({ id }) => {
  const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

  const [record, setRecord] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    base('Blackboxes (gallery)').find(id, function (err, record) {
      if (err) { console.error(err); return; }
      setRecord(record);
      setIsLoading(false);
    });
  }, []);

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