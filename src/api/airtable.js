import Airtable from 'airtable';

const base = new Airtable({ apiKey: import.meta.env.VITE_AIRTABLE_API_KEY }).base(import.meta.env.VITE_AIRTABLE_BASE_ID);

const blackBoxTable = base(import.meta.env.VITE_BLACK_BOX_TABLE_ID);
const peopleTable =  base(import.meta.env.VITE_PEOPLE_TABLE_ID);

const airtableFetchBlackBoxes = async (visibleBlackBoxFields) => {
  return await blackBoxTable.select({
    fields: visibleBlackBoxFields,
    returnFieldsByFieldId: true,
    view: '01 Website browse',
    pageSize: 25,
  }).all();
}

const airtableFetchSingleBox = async (id) => {
  return await blackBoxTable.find(id);
}

const airtableSearchBlackBoxes = async (visibleBlackBoxFields, searchQuery, searchFields) => {
  return await blackBoxTable.select({
    fields: visibleBlackBoxFields,
    filterByFormula: `OR(` + searchFields.map(field => (`SEARCH(LOWER("${searchQuery}"), LOWER(${field}))`)) + ')',
    returnFieldsByFieldId: true,
    view: '01 Website browse',
  }).all();
}

const airtableFetchPeople = async () => {
  return await peopleTable.select({
    fields: [
      import.meta.env.VITE_SORT_FIELD_ID,
      import.meta.env.VITE_NAME_FIELD_ID
    ],
    returnFieldsByFieldId: true,
  }).all();
}

export {
  airtableFetchBlackBoxes,
  airtableSearchBlackBoxes,
  airtableFetchPeople,
  airtableFetchSingleBox,
};