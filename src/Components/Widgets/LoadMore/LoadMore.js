import React from 'react';
import {Link} from 'react-router-dom';

import './LoadMore.css';
class LoadMore extends React.Component{

    renderBtn(){
        switch(this.props.loadMore){
            case true: if(this.props.end < this.props.length){
                        return(
                            <button className="loadmore-btn" onClick={this.props.OnClick}>{this.props.text}</button>
                        )
                        }
                        else{
                            return null;
                        }

            case false: return (
                        <Link to={this.props.link} className="loadmore-btn">{this.props.text}</Link>
                        )
            default: return null;
        }
    }

    render(){
        return(
            <React.Fragment>
                {this.renderBtn()}
            </React.Fragment>
        )
    }
}

export default LoadMore;