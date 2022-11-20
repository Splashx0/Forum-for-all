export const setMessages = (m) => {
  return {
    type: "SET_MESSAGES",
    payload: m,
  };
};
export const createMessage = (m) => {
  return {
    type: "CREATE_MESSAGE",
    payload: m,
  };
};
export const deleteMessages = (id) => {
  return {
    type: "DELETE_MESSAGES",
    payload: id,
  };
};
