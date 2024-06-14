import React  from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Reducers from "./redux/reducers";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "./App.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const store = createStore(
  Reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </BrowserRouter>
);
//  //"proxy": "http://localhost:8000",
