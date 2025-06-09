const buildBlackBoxWithPeople = (blackBox, peopleDict) => {
  if (blackBox.associations?.length > 0) {
    let associationNames = []
    blackBox.associations.forEach(id => {
      associationNames.push(peopleDict[id].name);
    })
    blackBox.associationNames = associationNames;
  }

  if (blackBox.authors?.length > 0) {
    let authorNames = []
    blackBox.authors.forEach(id => {
      authorNames.push(peopleDict[id].name);
    })
    blackBox.authorNames = authorNames;
  }

  return blackBox;
}

export { buildBlackBoxWithPeople };