import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistedStore } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";

// Material UI workaround, this will be patched when MUI 5.0 release.
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core";
// ...
const createTheme =
  process.env.NODE_ENV === "production"
    ? createMuiTheme
    : unstable_createMuiStrictModeTheme;
const theme = createTheme({
  // ...
});

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      {/* <PersistGate persistor={persistedStore}> */}
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      {/* </PersistGate> */}
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
