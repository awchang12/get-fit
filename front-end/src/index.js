import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import "semantic-ui-css/semantic.min.css";
import "./index.css"

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
registerServiceWorker();
