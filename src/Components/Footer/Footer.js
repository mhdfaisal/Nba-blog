import React from 'react';
import './Footer.css';
import {currentDate} from '../../config';
class Footer extends React.Component{

    render(){
        return(
            <div className="footer">
                <div>&copy; Mohd Faisal {currentDate} </div>
                <div className="logo"></div>
            </div>
        )
    }
}

export default Footer;