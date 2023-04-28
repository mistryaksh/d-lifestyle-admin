import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { Store } from "./features";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth.context";

ReactDOM.render(
     <React.StrictMode>
          <Provider store={Store}>
               <AuthContextProvider>
                    <BrowserRouter>
                         <App />
                    </BrowserRouter>
               </AuthContextProvider>
          </Provider>
     </React.StrictMode>,
     document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
