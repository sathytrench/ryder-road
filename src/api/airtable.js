import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base(process.env.REACT_APP_AIRTABLE_BASE_ID);

const blackBoxTable = base(process.env.REACT_APP_BLACK_BOX_TABLE_ID);
const peopleTable =  base(process.env.REACT_APP_PEOPLE_TABLE_ID);

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
  console.log(searchFields)
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
      process.env.REACT_APP_SORT_FIELD_ID,
      process.env.REACT_APP_NAME_FIELD_ID
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