import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Notifs } from 'redux-notifications';
import React, {createContext } from "react";

import store from "./store";
import history from "./utils/historyUtils";
import { authLogin } from "./actions/authActions";
import App from "./App";

const token = localStorage.getItem("token");

if (token) {
    store.dispatch(authLogin(token));
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
export const StoreContext = createContext();

root.render(

  <Router history={history}>
      <Provider store={store}>
        <App />
        <Notifs store={store} />
      </Provider>
  </Router>

);