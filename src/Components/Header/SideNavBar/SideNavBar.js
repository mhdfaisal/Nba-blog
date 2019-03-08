import React from 'react';
import SideNav from 'react-simple-sidenav';
import FontAwesomeIcon from 'react-fontawesome';
import NavItem from '../NavItem/NavItem';


import './SideNavBar.css';
class SideNavBar extends React.Component{

    
    navItems = [
        {name:"Home", icon:"home", link:"/", login:''},
        {name:"News", icon:"newspaper-o", link:"/news", login:''},
        {name:"Videos", icon:"video-camera", link:"videos", login:''},
        {name:"Sign in", icon:"sign-in", link:"/signin", login:false},
        {name:"Log Out", icon:"sign-out", link:"/signout", login:true},
        {name:"Dashboard", icon:"dashboard", link:"/dashboard", login:true}
    ]

     navStyle={ backgroundColor:"#000",
                width:"35vw"
    }

    render(){
        return(
            <div>
                <FontAwesomeIcon name="bars" className="menu-icon" onClick={this.props.toggleNav} />

                <SideNav navStyle={this.navStyle} showNav={this.props.showNav}  onHideNav={this.props.toggleNav}>

                    <NavItem navItems={this.navItems} OnClick={this.props.toggleNav} />

                </SideNav>
            </div>
        )
    }
}

export default SideNavBar;