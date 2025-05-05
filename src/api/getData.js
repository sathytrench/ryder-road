import { blackBoxTable, peopleTable, minifyBlackBoxRecords, minifyPeopleRecords } from './airtable';

const getPeople = async () => {
  try {
    const people =  await peopleTable.select({
      fields: [
        "fldmB5MOyLMlmqKOJ", // "Sort"
        "fldqy5eL2EhFbWvLp" // "Name"
      ],
      returnFieldsByFieldId: true,
    }).all();

    const minifiedPeople = minifyPeopleRecords(people);

    return { data: minifiedPeople, status: 200};
  } catch (err) {
    console.error(err);
    return { message: "Error fetching People data from the API", status: 500};
  }
}

const getBlackBoxes = async () => {
  try {
    const blackBoxes = await blackBoxTable.select({
      fields: [
        "flduNLVjaiAsfy87q", // "Simple title",
        "fldirc7JV8k3ds3RZ", // "Synopsis",
        "fldvdbumc4KnG1TAP", // "Black box photo",
        "fldFYS7KxHs9ooslF", // "Cover photo",
        "fld6veKESOgspPzIt", // "Description",
        "fldPD71fvby0z6516", // "Year",
        "fldm2eTYoWQjhjlCI", // "Author",
        "fldunLTtelrfSXW92", // "Association",
        "fld9YUWsfVLG3Qj9d", // "Tags",
      ],
      returnFieldsByFieldId: true,
      view: '01 Website browse',
      maxRecords: 10 // TO DO: REMOVE FOR PROD
    }).all();

    const minifiedBlackBoxes = minifyBlackBoxRecords(blackBoxes);
    return { data: minifiedBlackBoxes, status: 200 };
  } catch (err) {
    console.error(err);
    return { message: "Error fetching Black Box data from the API", status: 500};
  }
};

const getBlackBox = async (id) => {
  try {
    const blackBox = await blackBoxTable.find(id);
    const minifiedBlackBox = blackBox;

    return { data: minifiedBlackBox, status: 200 };
  } catch (err) {
    console.error(err);
    return { message: "Error fetching individual Black Box from the API", status: 500};
  }
}

export { getPeople, getBlackBoxes, getBlackBox };