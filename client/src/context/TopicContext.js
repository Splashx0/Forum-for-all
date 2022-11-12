import { createContext, useReducer } from "react";

export const TopicContext = createContext();

export const topicReducer = (state, action) => {
  switch (action.type) {
    case "GET_TOPICS":
      return {
        topics: action.payload,
      };
    default:
      return state;
  }
};

export const TopicContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(topicReducer, {
    topics: [],
  });

  return (
    <TopicContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TopicContext.Provider>
  );
};
