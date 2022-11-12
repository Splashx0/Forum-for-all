import { createContext, useReducer } from "react";

export const RoomContext = createContext();

export const roomReducer = (state, action) => {
  switch (action.type) {
    case "GET_ROOMS":
      return {
        rooms: action.payload,
      };
    case "CREATE_ROOMS":
      return {
        rooms: [action.payload, ...state.rooms],
      };
    case "DELETE_ROOMS":
      return {
        rooms: state.rooms.filter((room) => room._id !== action.payload),
      };
    default:
      return state;
  }
};
export const RoomContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(roomReducer, {
    rooms: [],
  });

  return (
    <RoomContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RoomContext.Provider>
  );
};
