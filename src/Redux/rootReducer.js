import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./authReducer";
import exploreReducer from "./exploreReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["explore"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  explore: exploreReducer,
});

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer;
