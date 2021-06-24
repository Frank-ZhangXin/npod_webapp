const initialState = {
  signedIn: false,
  userName: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SIGNEDIN":
      return {
        ...state,
        signedIn: action.value,
      };
    case "SET_USERNAME":
      return {
        ...state,
        userName: action.value,
      };
    default:
      return state;
  }
};

export default authReducer;
