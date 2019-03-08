import React from 'react';
import {Link} from 'react-router-dom';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import CardInfo from '../CardInfo/CardInfo';

class VideoTemplate extends React.Component{


    findTeam(team){
        const data  = this.props.teams.find(item => {
            return team===item.teamId; 
        });
        if(data){
            return data.name;
        }
        else{
            return null;
        }
    }

    renderVideoList(){
        switch(this.props.type){
            case "card": return this.props.videoList.map((item, index)=>{
                            return(
                                <CSSTransition classNames="videoItem" timeout={500} key={index}>
                                <div className="videoItem" >
                                    <div className="left" style={{background:`url('/images/videos/${item.image}')`}}>
                                        <img src="/images/play.png" alt="play-btn" className="playBtn"/>
                                    </div>
                                    <div className="right">
                                        <CardInfo date={item.date} team={this.findTeam(item.team)}/>
                                        <Link to={`videos/${item.id}`} >{item.title}</Link>
                                    </div>
                                    
                                </div>
                                </CSSTransition>
                            )
                        });
            
            case "related-card": return this.props.videoList.map((item, index)=>{
                            return(
                                <CSSTransition classNames="videoItem" timeout={500} key={index}>
                                <div className="videoItem" >
                                    <div className="left" style={{background:`url('/images/videos/${item.image}')`}}>
                                        <img src="/images/play.png" alt="play-btn" className="playBtn"/>
                                    </div>
                                    <div className="right">
                                        <CardInfo date={item.date} team={this.findTeam(item.team)}/>
                                        <Link to={`/videos/${item.id}`} >{item.title}</Link>
                                    </div>
                                    
                                </div>
                                </CSSTransition>
                            )
            });

            default: return null
        }
    }


    render(){
        return(
            <TransitionGroup className="videoList">
                {this.renderVideoList()}
            </TransitionGroup>
        );
    }
}

export default VideoTemplate;