const initState = null;
const problemsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PROBLEMS":
      state = action.payload;
      break;
    default:
      break;
  }
  return state;
};

export default problemsReducer;