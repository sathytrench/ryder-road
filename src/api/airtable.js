import Airtable from 'airtable';

import { convertFromRichText } from '../convertFromRichText';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const blackBoxTable = base('Blackboxes (gallery)');
const peopleTable =  base('People');

const getMinifiedBlackBoxRecord = (record) => {
  return {
    blackBoxPhoto: record.fields["fldvdbumc4KnG1TAP"] ? record.fields["fldvdbumc4KnG1TAP"][0] : null,
    simpleTitle: convertFromRichText(record.fields["flduNLVjaiAsfy87q"]),
    coverPhoto: record.fields["fldFYS7KxHs9ooslF"] ? record.fields["fldFYS7KxHs9ooslF"][0] : null,
    synopsis: convertFromRichText(record.fields["fldirc7JV8k3ds3RZ"]),
    description: convertFromRichText(record.fields["fld6veKESOgspPzIt"]),
    year: record.fields["fldPD71fvby0z6516"],
    tags: record.fields["fld9YUWsfVLG3Qj9d"],
    authors: record.fields["fldm2eTYoWQjhjlCI"],
    associations: record.fields["fldunLTtelrfSXW92"],
  }
}

const minifyBlackBoxRecords = (records) => {
  return records.map((record) => getMinifiedBlackBoxRecord(record));
}

const getMinifiedPeopleRecord = (record) => {
  return {
    id: record.id,
    authorSortName: record.fields["fldmB5MOyLMlmqKOJ"]
  }
}

const minifyPeopleRecords = (records) => {
  return records.map((record) => getMinifiedPeopleRecord(record));
}

export { blackBoxTable, peopleTable, minifyBlackBoxRecords, minifyPeopleRecords };