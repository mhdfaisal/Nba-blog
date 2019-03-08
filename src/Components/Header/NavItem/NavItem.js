import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import UserContext from '../../../Context/UserContext';
import {firebase} from '../../../firebase';
import history from '../../../history';

import './NavItem.css';

class NavItem extends React.Component{

    static contextType = UserContext;

    onSignOutClicked = ()=>{
        firebase.auth().signOut()
        .then(()=>{
            this.props.OnClick();
            history.push("/");
        })
    }


    renderRestrictedItem(item,index){
        
        if(this.context!==null){
            if(item.login){
                if(item.name==="Log Out"){
                    return(
                        <div key={index} className="navItem">
                        <Link to=""  onClick={this.onSignOutClicked}> <FontAwesome name={item.icon} /> {item.name}</Link>
                        </div>
                    )
                }
                else{
                    return(
                        <div key={index} className="navItem">
                        <Link to={item.link} onClick={this.props.OnClick}> <FontAwesome name={item.icon} /> {item.name}</Link>
                        </div>
                    )
                }
            }
        }
        else{
            return !item.login? (
                <div key={index} className="navItem">
                <Link to={item.link} onClick={this.props.OnClick}> <FontAwesome name={item.icon} /> {item.name}</Link>
            </div>): ''
        } 
    }

    renderListItems(){
        
        const listItems = this.props.navItems.map((item, index)=>{
                if(item.login===''){
                    return(
                        <div key={index} className="navItem">
                        <Link to={item.link} onClick={this.props.OnClick}> <FontAwesome name={item.icon} /> {item.name}</Link>
                        </div>
                    )
                }
                else{
                    return this.renderRestrictedItem(item,index);
                }
        });

        return listItems;
    }
    
    render(){
        return(
            <div>
                {this.renderListItems()}
            </div>
        )
    }
}

export default NavItem;