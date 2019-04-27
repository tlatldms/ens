import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from 'pages/Detail';

const Root = () => {
    return (
        <BrowserRouter
        basename="/ens">
            <App/>
        </BrowserRouter>
    );
};

export default Root;