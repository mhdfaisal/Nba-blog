import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

import './Layout.css';
class Layout extends React.Component{

    state={showNav:false};

    onToggleNav = ()=>{
        this.setState({showNav: this.state.showNav?false:true});
    }

    render(){
        //console.log(this.state.showNav);
        return(
            <div>
                <Header showNav={this.state.showNav} toggleNav={this.onToggleNav}/>
                {this.props.children}
                <Footer />  
            </div>
        )
    }
}

export default Layout;