export const setTopics = (t) => {
  return {
    type: "SET_TOPICS",
    payload: t,
  };
};
export const updateTopics = (r) => {
  return {
    type: "UPDATE_TOPICS",
    payload: r,
  };
};
