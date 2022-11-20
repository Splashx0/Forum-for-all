const roomReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case "SET_ROOMS":
      return { rooms: action.payload };
    case "CREATE_ROOM":
      return { rooms: [...state.rooms, action.payload] };
    case "DELETE_ROOM":
      return {
        rooms: state.rooms.filter((room) => room._id !== action.payload),
      };
    default:
      return state;
  }
};

export default roomReducer;
