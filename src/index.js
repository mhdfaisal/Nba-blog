import React from 'react';
import ReactDOM from 'react-dom';
import {firebase} from './firebase';

import App from './Components/App/App';

    firebase.auth().onAuthStateChanged((user)=>{
        ReactDOM.render(<App user={user} />, document.querySelector("#root"));
    });
