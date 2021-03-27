import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Page1 from './page1';
import Layout from './Layout';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import Sidebar from './Sidebar';

function Routes() {
    return (
        <BrowserRouter>
            <Route render={(props) => (
                <>
                <Layout {...props}/>
                <Switch>
                    <Route path="/" exact component={Page1}/>
                    <Route path="/page2" exact component={Page2}/>
                    <Route path="/page3" exact component={Page3}/>
                </Switch>
                </>
            )}/>
        </BrowserRouter>
    )
} 

export default Routes