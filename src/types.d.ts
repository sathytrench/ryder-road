import { type Record as AirtableRecord } from 'airtable';

///////// UNMUTATED AIRTABLE RECORD TYPES /////////////////

type Thumbnail = {
  url: string
  width: number
  height: number
}

type PhotoFromAirtableAPI = {
  id: string
  width: number
  height: number
  url: string
  filename: string
  size: number
  type: string
  thumbnails: {
    small: Thumbnail
    large: Thumbnail
    full: Thumbnail
  }
}

// this API call returns fields as IDs
type PeopleRecordFields = {
  "fldmB5MOyLMlmqKOJ": string,
  "fldqy5eL2EhFbWvLp": string
}

type PeopleRecord = AirtableRecord<PeopleRecordFields>

// this API call returns fields as IDs
type BlackBoxRecordFields = {
  "flduNLVjaiAsfy87q": string,
  "fldirc7JV8k3ds3RZ": string,
  "fldvdbumc4KnG1TAP": PhotoFromAirtableAPI[],
  "fldFYS7KxHs9ooslF": PhotoFromAirtableAPI[],
  "fld6veKESOgspPzIt": string,
  "fldPD71fvby0z6516": string,
  "fldm2eTYoWQjhjlCI": string[],
  "fldunLTtelrfSXW92": string[],
  "fld9YUWsfVLG3Qj9d": string,
}

type BlackBoxRecord = AirtableRecord<BlackBoxRecordFields>

// this API call returns fields as names
type IndividualBlackBoxRecordFields = {
    "Short title": string
    "Author": string[]
    "Association": string[]
    "Year (range)": string
    "Location": string
    "Cover photo": PhotoFromAirtableAPI[],
    "Sort (from Author)": string[]
    "Description": string
    "Additional inscriptions": string
    "RPBB": string
    "Catalog note": string
    "Tags": string[]
    "Catalog": string
    "Catalog notes": string
    "Urgency": number
    "Year (numeric)": number
    "Task notes": string
    "Created": string
    "Synopsis": string
    "Additional photos": PhotoFromAirtableAPI[]
    "Note to Kevin": string
    "Last Modified": string
    "Kevin's checkbox": true
    "Cataloger": string
    "Black box photo": PhotoFromAirtableAPI[]
    "Simple title": string
    "Created 2": string
    "Cataloged": boolean
    "Object type": string[]
    "Simple title sort view": string
    "Short title (from Reference library)": string[]
}

type IndividualBlackBoxRecord = AirtableRecord<IndividualBlackBoxRecordFields>

/////// MINIFIED TYPES ///////////////////////////

interface BlackBoxRecordData {
  id: string
  simpleTitle: string
  synopsis: string
  blackBoxPhoto: PhotoFromAirtableAPI
  coverPhoto: PhotoFromAirtableAPI
  description: string
  year: string
  authors: string[]
  associations: string[]
  tags: string
}

interface IndividualBlackBoxRecordData {
  id: string
  year: string
  authors: string[]
  associations: string[]
  simpleTitle: string
  synopsis: string
  coverPhoto: PhotoFromAirtableAPI | null,
  additionalPhotos: PhotoFromAirtableAPI[] | null
  description: string
  additionalInscriptions: string
  catalogNotes: string
  referenceLibraryShortTitles?: string[]
  rpbb: string
  cataloger: string
}

type PersonRecordData = {
  id: string
  name: string
  sort: string
}

/////// DIGESTED FOR FRONTEND TYPES ///////////////////////////

interface BlackBoxForIndexFrontend extends BlackBoxRecordData {
  associationNames: string[]
}

type AuthorWithBlackBoxes = {
  authorSortKey: string
  authorNames: string[]
  authorSortNames: string[]
  blackBoxes: BlackBoxForIndexFrontend[]
}

interface IndividualBlackBoxForFrontEnd extends IndividualBlackBoxRecordData{
  authorNames: string[]
  associationNames: string[] | undefined
}

type AuthorForDictionary = {
  sort: string
  name: string
}

type AuthorsAsDict = Record<string, AuthorForDictionary>

export type {
  PeopleRecord,
  BlackBoxRecord,
  IndividualBlackBoxRecord,
  PhotoFromAirtableAPI,
  PersonRecordData,
  AuthorsAsDict,
  AuthorWithBlackBoxes,
  BlackBoxRecordData,
  BlackBoxForIndexFrontend,
  IndividualBlackBoxRecordData,
  IndividualBlackBoxForFrontEnd
};