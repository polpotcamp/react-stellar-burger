import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { MainReducer } from "./services/reduces/MainReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { wsActions } from "./services/constants";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
export const store = createStore(MainReducer, composeWithDevTools(applyMiddleware(thunk),applyMiddleware(socketMiddleware(wsActions))))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <HashRouter>
          <App />
        </HashRouter>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
