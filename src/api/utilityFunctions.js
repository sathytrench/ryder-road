import { convertFromRichText } from '../utils/convertFromRichText';

const getMinifiedBlackBoxRecord = (record) => {
  return {
    id: record.id,
    blackBoxPhoto: record.fields[process.env.REACT_APP_BLACK_BOX_PHOTO_FIELD_ID]
      ? record.fields[process.env.REACT_APP_BLACK_BOX_PHOTO_FIELD_ID][0]
      : null,
    simpleTitle: convertFromRichText(
      record.fields[process.env.REACT_APP_SIMPLE_TITLE_FIELD_ID]
      ) || "Simple title coming soon<br /><br />",
    coverPhoto: record.fields[process.env.REACT_APP_COVER_PHOTO_FIELD_ID]
      ? record.fields[process.env.REACT_APP_COVER_PHOTO_FIELD_ID][0]
      : null,
    synopsis: convertFromRichText(
      record.fields[process.env.REACT_APP_SYNOPSIS_FIELD_ID]
      ) || "Synopsis coming soon<br /><br />",
    description: convertFromRichText(
      record.fields[process.env.REACT_APP_DESCRIPTION_FIELD_ID]
      ) || "Description coming soon<br /><br />",
    year: record.fields[process.env.REACT_APP_YEAR_FIELD_ID],
    tags: record.fields[process.env.REACT_APP_TAGS_FIELD_ID],
    authors: record.fields[process.env.REACT_APP_AUTHOR_FIELD_ID],
    associations: record.fields[process.env.REACT_APP_ASSOCIATION_FIELD_ID],
  }
}

const minifyBlackBoxRecords = (records) => {
  return records.map((record) => getMinifiedBlackBoxRecord(record));
}

const getMinifiedPeopleRecord = (record) => {
  return {
    id: record.id,
    sort: record.fields[process.env.REACT_APP_SORT_FIELD_ID],
    name: record.fields[process.env.REACT_APP_NAME_FIELD_ID]
  }
}

const minifyPeopleRecords = (records) => {
  return records.map((record) => getMinifiedPeopleRecord(record));
}

export { minifyBlackBoxRecords, minifyPeopleRecords };