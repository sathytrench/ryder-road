import { type Record as AirtableRecord } from 'airtable';

///////// UNMUTATED AIRTABLE RECORD TYPES /////////////////

// this API call returns fields as IDs
const PeopleRecordFields = [
  import.meta.env.VITE_SORT_FIELD_ID,
  import.meta.env.VITE_NAME_FIELD_ID
]

type PeopleRecord = AirtableRecord<PeopleRecordFields>

// this API call returns fields as IDs
const BlackBoxRecordFields = [
  import.meta.env.VITE_SIMPLE_TITLE_FIELD_ID,
  import.meta.env.VITE_SYNOPSIS_FIELD_ID,
  import.meta.env.VITE_BLACK_BOX_PHOTO_FIELD_ID,
  import.meta.env.VITE_COVER_PHOTO_FIELD_ID,
  import.meta.env.VITE_DESCRIPTION_FIELD_ID,
  import.meta.env.VITE_YEAR_FIELD_ID,
  import.meta.env.VITE_AUTHOR_FIELD_ID,
  import.meta.env.VITE_ASSOCIATION_FIELD_ID,
  import.meta.env.VITE_TAGS_FIELD_ID,
]

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