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
import { BrowserRouter } from "react-router-dom";
import { wsActions } from "./services/actions/actions";
import { socketMiddleware } from "./services/middleware/socketMiddleware";
import { wsUrl } from "./utils/WS";
const store = createStore(MainReducer, composeWithDevTools(applyMiddleware(thunk),applyMiddleware(socketMiddleware(wsUrl,wsActions))))
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DndProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
