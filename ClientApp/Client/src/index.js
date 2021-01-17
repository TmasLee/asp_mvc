import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';

import App from "./App.jsx";

axios.defaults.withCredentials = true;

ReactDOM.render(
    <BrowserRouter >
        <App />
    </BrowserRouter>,
    document.getElementById("root")
);
