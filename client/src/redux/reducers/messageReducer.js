const messageReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case "SET_MESSAGES":
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
          (message) => message.room._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default messageReducer;
