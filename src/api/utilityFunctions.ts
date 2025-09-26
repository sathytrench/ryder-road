import { BlackBoxRecord, IndividualBlackBoxRecord, PeopleRecord } from '../types';
import { convertFromRichText } from '../utils/convertFromRichText';

const getTransformedBlackBoxRecord = (record: BlackBoxRecord) => {
  return {
    id: record.id,
    blackBoxPhoto: record.fields["fldvdbumc4KnG1TAP"]
      ? record.fields["fldvdbumc4KnG1TAP"][0]
      : null,
    simpleTitle: convertFromRichText(
      record.fields["flduNLVjaiAsfy87q"]
      ) || "[Simple title coming soon]<br /><br />",
    coverPhoto: record.fields["fldFYS7KxHs9ooslF"]
      ? record.fields["fldFYS7KxHs9ooslF"][0]
      : null,
    synopsis: convertFromRichText(
      record.fields["fldirc7JV8k3ds3RZ"]
      ) || "[Synopsis coming soon]<br /><br />",
    description: convertFromRichText(
      record.fields["fld6veKESOgspPzIt"]
      ) || "[Description coming soon]<br /><br />",
    year: record.fields["fldPD71fvby0z6516"],
    tags: record.fields["fld9YUWsfVLG3Qj9d"],
    authors: record.fields["fldm2eTYoWQjhjlCI"],
    associations: record.fields["fldunLTtelrfSXW92"],
  }
}

const transformBlackBoxRecords = (records: BlackBoxRecord[]) => {
  return records.map((record) => getTransformedBlackBoxRecord(record));
}

const getTransformedPeopleRecord = (record: PeopleRecord) => {
  return {
    id: record.id,
    sort: record.fields["fldmB5MOyLMlmqKOJ"],
    name: record.fields["fldqy5eL2EhFbWvLp"]
  }
}

const transformPeopleRecords = (records: PeopleRecord[]) => {
  return records.map((record) => getTransformedPeopleRecord(record));
}

const getTransformedDetailedBoxRecord = (record: IndividualBlackBoxRecord) => {
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

const transformDetailedBoxRecords = (record: IndividualBlackBoxRecord) => {
  return getTransformedDetailedBoxRecord(record);
}

export { transformBlackBoxRecords, transformPeopleRecords, transformDetailedBoxRecords };