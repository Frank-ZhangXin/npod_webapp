const initialState = {
  signedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SIGNEDIN":
      return {
        ...state,
        signedIn: action.value,
      };
    default:
      return state;
  }
};

export default authReducer;
