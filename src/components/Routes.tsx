import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Page1 from '../pages/Page1';
import Layout from './Layout';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import BoxGrid from '../pages/BoxGrid';
import DropZone from './Upload';

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
                    <Route path="/upload" exact component={DropZone}/>
                    <Route path="/box-grid" exact component={BoxGrid}/>
                </Switch>
                </>
            )}/>
        </BrowserRouter>
    )
} 

export default Routes