import React from 'react';

import {withRouter} from 'react-router-dom';
import {firebaseTeams, firebaseDb, firebaseVideos, firebaseLooper} from '../../../firebase';
import VideoTemplate from '../../Widgets/VideoList/VideoTemplate';
class RelatedVideos extends React.Component{

    state = {videoTags:[], videoList:[], teams:[], videoId:this.props.videoId}

    componentDidMount(){
        this.fetchTags(this.state.videoId);
    }

    componentDidUpdate(prevProps){
        if(prevProps.videoId !== this.props.videoId){
             this.setState({videoId:this.props.videoId})
                this.fetchTags(this.props.videoId);
        }
    }


    fetchTags(videoId) {
        
        firebaseDb.ref(`videos/${videoId}`).once('value')
        .then((snapshot)=>{
            let data = snapshot.val().tags;
            this.setState({videoTags:[...data]}, ()=>{
                this.fetchRelatedVideos()
            })
        })
    }

    fetchRelatedVideos = async ()=>{
        const q= this.state.videoTags[0];
        firebaseVideos.orderByChild('tags/0').equalTo(q).once('value')
        .then((snapshot)=>{
            const data = firebaseLooper(snapshot);
            return data;
        })
        .then((data)=>{
            this.setState({videoList:[...data]}, ()=>{
                this.fetchTeams();
            });
        })
    }

    fetchTeams = async()=>{
    
        firebaseTeams.once('value')
        .then((snapshot)=>{
            const data = firebaseLooper(snapshot);
            return data;
        })
        .then(data=>{
            this.setState({teams:[...data]})
        })
    }

    render(){
        
        if(this.state.videoList){
            return(
                <VideoTemplate type="related-card" videoList={this.state.videoList} teams={this.state.teams}/>
            )
        }
        else{
            return <div>Loading...</div>
        }
    }
}

export default withRouter(RelatedVideos);