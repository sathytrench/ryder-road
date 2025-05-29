import {
  airtableFetchBlackBoxes,
  airtableSearchBlackBoxes,
  airtableFetchSingleBox,
  airtableFetchPeople
} from './airtable';
import { minifyBlackBoxRecords, minifyPeopleRecords } from './utilityFunctions';

const visibleBlackBoxFields = [
  import.meta.env.VITE_SIMPLE_TITLE_FIELD_ID,
  import.meta.env.VITE_SYNOPSIS_FIELD_ID,
  import.meta.env.VITE_BLACK_BOX_PHOTO_FIELD_ID,
  import.meta.env.VITE_COVER_PHOTO_FIELD_ID,
  import.meta.env.VITE_DESCRIPTION_FIELD_ID,
  import.meta.env.VITE_YEAR_FIELD_ID,
  import.meta.env.VITE_AUTHOR_FIELD_ID,
  import.meta.env.VITE_ASSOCIATION_FIELD_ID,
  import.meta.env.VITE_TAGS_FIELD_ID,
];

const getPeople = async () => {
  try {
    const people = await airtableFetchPeople();
    const minifiedPeople = minifyPeopleRecords(people);
    return { data: minifiedPeople, status: 200};
  } catch (err) {
    console.error(err);
    return { message: "Error fetching People data from the API", status: 500};
  }
}

const getBlackBoxes = async () => {
  try {
    const blackBoxes = await airtableFetchBlackBoxes(visibleBlackBoxFields);
    const minifiedBlackBoxes = minifyBlackBoxRecords(blackBoxes);
    return { data: minifiedBlackBoxes, status: 200 };
  } catch (err) {
    console.error(err);
    return { message: "Error fetching Black Box data from the API", status: 500};
  }
};

const searchBlackBoxes = async (searchQuery, searchFields = visibleBlackBoxFields) => {
  try {
    const blackBoxes = await airtableSearchBlackBoxes(visibleBlackBoxFields, searchQuery, searchFields)
    const minifiedBlackBoxes = minifyBlackBoxRecords(blackBoxes);
    return { data: minifiedBlackBoxes, status: 200 };
  } catch (err) {
    console.error(err);
    return { message: "Error fetching Black Box data from the API", status: 500};
  }
};

const getBlackBox = async (id) => {
  try {
    const blackBox = await airtableFetchSingleBox(id);
    const minifiedBlackBox = blackBox;
    return { data: minifiedBlackBox, status: 200 };
  } catch (err) {
    console.error(err);
    return { message: "Error fetching individual Black Box from the API", status: 500};
  }
}

export { getPeople, getBlackBoxes, searchBlackBoxes, getBlackBox };