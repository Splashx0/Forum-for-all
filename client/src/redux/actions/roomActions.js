export const setRooms = (r) => {
  return {
    type: "SET_ROOMS",
    payload: r,
  };
};
export const createRoom = (r) => {
  return {
    type: "CREATE_ROOM",
    payload: r,
  };
};
export const deleteRoom = (id) => {
  return {
    type: "DELETE_ROOM",
    payload: id,
  };
};
