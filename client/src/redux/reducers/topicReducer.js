const topicReducer = (state = { topics: [] }, action) => {
  switch (action.type) {
    case "SET_TOPICS":
      return { topics: action.payload };
    case "UPDATE_TOPICS":
      return {
        ...state,
        topics: state.topics.map((topic) => ({
          ...topic,
          rooms: (topic.rooms ?? []).filter(
            (room) => room._id !== action.payload
          ),
        })),
      };
    default:
      return state;
  }
};

export default topicReducer;
