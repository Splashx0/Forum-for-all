import { createContext, useReducer } from "react";

export const MessagesContext = createContext();

export const messagesReducer = (state, action) => {
  switch (action.type) {
    case "GET_MESSAGES":
      return {
        messages: action.payload,
      };
    case "CREATE_MESSAGE":
      return {
        messages: [action.payload, ...state.messages],
      };
    case "DELETE_MESSAGES":
      return {
        messages: state.messages.filter(
          (message) => message._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export const MessagesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messagesReducer, {
    messages: [],
  });

  return (
    <MessagesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};
