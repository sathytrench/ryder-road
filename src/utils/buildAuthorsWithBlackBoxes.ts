import {
  AuthorsAsDict,
  AuthorWithBlackBoxes,
  BlackBoxRecordData
} from "../types";

const buildAuthorsWithBlackBoxes = (blackBoxes: BlackBoxRecordData[], peopleDict: AuthorsAsDict) => {
  let authorsWithBlackBoxes = [] as AuthorWithBlackBoxes[];
  (blackBoxes).forEach(box => {
    const blackBoxDeepCopy = JSON.parse(JSON.stringify(box));

    if (box.associations) {
      const associationIds = box.associations;
      let associationNames = [] as string[];

      associationIds.forEach((id: string) => {
        const associationName = peopleDict[id].name;
        associationNames.push(associationName);
      })

      blackBoxDeepCopy.associationNames = associationNames;
    }

    const authorIds = box.authors;
    let authorNames = [] as string[];
    let authorSortNames = [] as string[];
    authorIds.forEach(id => {
      const authorSort = peopleDict[id].sort;
      const authorName = peopleDict[id].name;
      authorNames.push(authorName);
      authorSortNames.push(authorSort);
    });
    const authorSortKey = authorSortNames.toString();
    if (authorsWithBlackBoxes.findIndex(element => element.authorSortKey === authorSortKey) > -1) {
      authorsWithBlackBoxes[authorsWithBlackBoxes.findIndex(element => element.authorSortKey === authorSortKey)].blackBoxes.push(blackBoxDeepCopy);
    } else {
      authorsWithBlackBoxes.push({ authorSortKey, authorNames, authorSortNames, blackBoxes: [blackBoxDeepCopy] });
    }
  })

  return authorsWithBlackBoxes;
}

export { buildAuthorsWithBlackBoxes };