const INITIAL_STATE = {
  calEvents: [],
};

const calendarReducer = (state, action) => {
  switch (action.type) {
    case "SET_CAL_EVENTS":
      return { calEvents: action.payload };
    default:
      return state;
  }
};
