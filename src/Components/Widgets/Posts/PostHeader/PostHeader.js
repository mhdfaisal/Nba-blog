import React from 'react';

import './PostHeader.css';

class PostHeader extends React.Component{

    renderWinDefeat(){
        const winDefeat = this.props.data.stats.map((item, index)=>{
            return(
                <div className="PostHeader-win" key={index}>
                    <span>W{item.wins}-</span>
                    <span>L{item.defeats}</span>
                </div>
            )
        });
        return winDefeat;
    }

    renderHeader(){
        if(this.props.data){
            return(
                <div className="PostHeader">
                <div className="PostHeader-logo" style={{background:`url('/images/teams/${this.props.data.logo}')`}}></div>
                <div className="PostHeader-content">
                    <div className="PostHeader-team">
                        <span>{this.props.data.city}</span>
                        <span style={{marginLeft:"0.5rem"}}>{this.props.data.name}</span>
                    </div>
                    {this.renderWinDefeat()}
                </div>
            </div>
        );
        }
        else
            return <div>Loading...</div>
            
    }
   
    render(){
        return(
            <div>
                {this.renderHeader()}
            </div>
        );
    }
}

export default PostHeader;