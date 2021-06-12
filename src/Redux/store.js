import { createStore } from "redux";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, composeWithDevTools());
// const store = createStore(rootReducer);

const persistedStore = persistStore(store);

// export { store, persistedStore };
export { store };
