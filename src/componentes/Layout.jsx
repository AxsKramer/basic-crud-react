import React from 'react';
import Header from './Header';

const Layout = (props) => {
    return (
        <div className="container mt-5">
            <Header />
            <div className="row">
                {props.children}
            </div>
        </div>
      );
}
 
export default Layout;
