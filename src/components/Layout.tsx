import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { convertToObject } from 'typescript';

function Layout(props: any) {
    console.log('IN Layout');
    return (
        <div>
            <Header history={props.history}/>
            {/* <Sidebar history={props.history}/> */}
        </div>
    );
}
export default Layout