import React from 'react';
import { Route } from 'react-router-dom';
import Main from './Main';

const Detail = () => {
    return (
        <div>
            <Route exact path='/' component={Main} />
        </div>
    );
};

export default Detail;