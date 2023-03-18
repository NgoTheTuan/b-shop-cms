import authAction from "../actions/auth";

const initState = JSON.parse(window.localStorage.getItem("user") || "{}");

function userReducer(state = initState, action) {
  switch (action.type) {
    case authAction.LOGIN: {
      window.localStorage.setItem(
        "token",
        JSON.stringify(action.payload.token || "")
      );
      window.localStorage.setItem(
        "user",
        JSON.stringify(action.payload.user || "{}")
      );

      return {
        ...state,
        ...action?.payload?.user,
      };
    }

    case authAction.LOGOUT: {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");

      return {};
    }
    default:
      return state;
  }
}

export default userReducer;
