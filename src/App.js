import 'bootstrap/dist/css/bootstrap.min.css';
import 'redux-notifications/lib/styles.css';

import React from "react";
import store from "./store";
import MainContent from "./Components/MainContent";
import loadContent, {loadUserContent} from "./utils/loadContent";


export default function App (){

    loadContent("", "", dispatchEvent);
    loadUserContent(dispatchEvent);

    return (
        <div>
            <MainContent store={store} />
        </div>
    );
}
