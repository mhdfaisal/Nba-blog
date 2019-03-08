import React from 'react';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import './CardInfo.css';
class CardInfo extends React.Component{


    formatDate(date){
        return moment(date).format(' DD/MM/YYYY ');
    }

    render(){
        return(
            <div className="card-info">
                <div className="team">{this.props.team}</div>
                <div className="date">
                    <FontAwesome name="clock-o" />
                    {this.formatDate(this.props.date)}
                </div>
            </div>
        )
    }
}

export default CardInfo;