import React from 'react';
import SideNavBar from './SideNavBar/SideNavBar';

import './Header.css';
class Header extends React.Component{

    logo = ()=>{
        return <div className="logo"></div>
    }

    render(){
        return(
            <header className="header">
               <div className="container">
                    <SideNavBar showNav={this.props.showNav} toggleNav={this.props.toggleNav} />
                    {this.logo()}
               </div>
            </header>
        )
    }
}
export default Header;