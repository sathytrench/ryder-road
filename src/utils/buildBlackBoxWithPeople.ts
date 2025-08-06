import { AuthorsAsDict, IndividualBlackBoxRecordData } from "../types";

const buildBlackBoxWithPeople = (blackBox: IndividualBlackBoxRecordData, peopleDict: AuthorsAsDict) => {
  const blackBoxDeepCopy = JSON.parse(JSON.stringify(blackBox));

  if (blackBox.associations?.length > 0) {
    let associationNames = [] as string[];
    blackBox.associations.forEach((id: string) => {
      associationNames.push(peopleDict[id].name);
    })
    blackBoxDeepCopy.associationNames = associationNames;
  }

  if (blackBox.authors?.length > 0) {
    let authorNames = [] as string[];
    blackBox.authors.forEach((id: string) => {
      authorNames.push(peopleDict[id].name);
    })
    blackBoxDeepCopy.authorNames = authorNames;
  }

  return blackBoxDeepCopy;
}

export { buildBlackBoxWithPeople };