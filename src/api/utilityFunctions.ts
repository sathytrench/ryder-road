import { BlackBoxRecord, IndividualBlackBoxRecord, PeopleRecord } from '../types';
import { convertFromRichText } from '../utils/convertFromRichText';

const getMinifiedBlackBoxRecord = (record: BlackBoxRecord) => {
  return {
    id: record.id,
    blackBoxPhoto: record.fields[import.meta.env.VITE_BLACK_BOX_PHOTO_FIELD_ID]
      ? record.fields[import.meta.env.VITE_BLACK_BOX_PHOTO_FIELD_ID][0]
      : null,
    simpleTitle: convertFromRichText(
      record.fields[import.meta.env.VITE_SIMPLE_TITLE_FIELD_ID]
      ) || "[Simple title coming soon]<br /><br />",
    coverPhoto: record.fields[import.meta.env.VITE_COVER_PHOTO_FIELD_ID]
      ? record.fields[import.meta.env.VITE_COVER_PHOTO_FIELD_ID][0]
      : null,
    synopsis: convertFromRichText(
      record.fields[import.meta.env.VITE_SYNOPSIS_FIELD_ID]
      ) || "[Synopsis coming soon]<br /><br />",
    description: convertFromRichText(
      record.fields[import.meta.env.VITE_DESCRIPTION_FIELD_ID]
      ) || "[Description coming soon]<br /><br />",
    year: record.fields[import.meta.env.VITE_YEAR_FIELD_ID],
    tags: record.fields[import.meta.env.VITE_TAGS_FIELD_ID],
    authors: record.fields[import.meta.env.VITE_AUTHOR_FIELD_ID],
    associations: record.fields[import.meta.env.VITE_ASSOCIATION_FIELD_ID],
  }
}

const minifyBlackBoxRecords = (records: BlackBoxRecord[]) => {
  return records.map((record) => getMinifiedBlackBoxRecord(record));
}

const getMinifiedPeopleRecord = (record: PeopleRecord) => {
  return {
    id: record.id,
    sort: record.fields[import.meta.env.VITE_SORT_FIELD_ID],
    name: record.fields[import.meta.env.VITE_NAME_FIELD_ID]
  }
}

const minifyPeopleRecords = (records: PeopleRecord[]) => {
  return records.map((record) => getMinifiedPeopleRecord(record));
}

const getMinifiedDetailedBoxRecord = (record: IndividualBlackBoxRecord) => {
  return {
    id: record.id,
    year: record.fields["Year (range)"],
    authors: record.fields["Author"],
    associations: record.fields["Association"],
    simpleTitle: convertFromRichText(
      record.fields["Simple title"]
      ) || "[Simple title coming soon]<br /><br />",
    synopsis: convertFromRichText(
      record.fields["Synopsis"]
      ) || "[Synopsis coming soon]<br /><br />",
    coverPhoto: record.fields["Cover photo"]
      ? record.fields["Cover photo"][0]
      : null,
    additionalPhotos: record.fields["Additional photos"]
      ? record.fields["Additional photos"]
      : null,
    description: convertFromRichText(
      record.fields["Description"]
      ) || "[Description coming soon]<br /><br />",
    additionalInscriptions: convertFromRichText(
      record.fields["Additional inscriptions"]
      ) || "[Additional inscriptions coming soon]<br /><br />",
    catalogNotes: convertFromRichText(
      record.fields["Catalog notes"]
      ) || "[Catalog notes coming soon]<br /><br />",
    referenceLibraryShortTitles: record.fields["Short title (from Reference library)"],
    rpbb: record.fields["RPBB"],
    cataloger: record.fields["Cataloger"]
  }
}

const minifyDetailedBoxRecords = (record: IndividualBlackBoxRecord) => {
  return getMinifiedDetailedBoxRecord(record);
}

export { minifyBlackBoxRecords, minifyPeopleRecords, minifyDetailedBoxRecords };