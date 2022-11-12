export const GetParticipantsNumber = (arr) => {
  const UniqueIds = [];
  const unique = arr.filter((elem) => {
    const isDuplicate = UniqueIds.includes(elem.user._id);
    if (!isDuplicate) {
      UniqueIds.push(elem.user._id);
      return UniqueIds;
    }
  });
  return unique;
};
