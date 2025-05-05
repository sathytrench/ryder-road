const buildAuthorsWithBlackBoxes = (blackBoxes, authorsLookup) => {
  let authorsWithBlackBoxes = [];
  blackBoxes.forEach(box => {
    if (box.associations) {
      const associationIds = box.associations;
      let associationNames = [];

      associationIds.forEach(id => {
        const associationName = authorsLookup[id].name;
        associationNames.push(associationName);
      })

      box.associationNames = associationNames;
    }

    const authorIds = box.authors;
    let authorNames = [];
    let authorSortNames = [];
    authorIds.forEach(id => {
      const authorSort = authorsLookup[id].sort;
      const authorName = authorsLookup[id].name;
      authorNames.push(authorName);
      authorSortNames.push(authorSort);
    });
    const authorSortKey = authorSortNames.toString();
    if (authorsWithBlackBoxes.findIndex(element => element.authorSortKey === authorSortKey) > -1) {
      authorsWithBlackBoxes[authorsWithBlackBoxes.findIndex(element => element.authorSortKey === authorSortKey)].blackBoxes.push(box);
    } else {
      authorsWithBlackBoxes.push({ authorSortKey, authorNames, authorSortNames, blackBoxes: [box] });
    }
  })

  return authorsWithBlackBoxes;
}

export { buildAuthorsWithBlackBoxes };