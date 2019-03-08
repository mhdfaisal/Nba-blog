import React from 'react';
import {firebaseVideos, firebaseLooper, firebaseTeams} from '../../../firebase';

import VideoTemplate from './VideoTemplate';
import LoadMore from '../LoadMore/LoadMore';

import './VideoList.css';

class VideoList extends React.Component{

    state ={videoList:[], teams:[] , start:this.props.start, end:this.props.end, limit:this.props.limit, length:0}

    componentDidMount(){
        this.fetchVideos();
        this.getTotalRecords();
        this.fetchTeams();
    }

    getTotalRecords = async() =>{
        
        firebaseVideos.once('value')
        .then((snapshot)=>{
            const data = firebaseLooper(snapshot);
            this.setState({length: data.length})
        })
    }

    fetchTeams = async()=>{
        // const response = await fetchData.get('/teams');
        // this.setState({teams:[...this.state.teams, ...response.data]});
        firebaseTeams.once('value')
        .then((snapshot)=>{
            const data = firebaseLooper(snapshot);
            return data;
        })
        .then((data)=>{
            this.setState({teams:[...this.state.teams,...data]});
        })
        .catch(e=> console.log(e));
    }

     fetchVideos = async ()=> {

        firebaseVideos.orderByChild('id').startAt(this.state.start).endAt(this.state.end-1).once('value')
        .then((snapshot)=>{
            const data = firebaseLooper(snapshot);
            return data;
        })
        .then((data)=>{
            this.setState({videoList:[...this.state.videoList, ...data], start:this.state.end, end:this.state.end + this.state.limit});
        })
        .catch((e)=> console.log(e));
        
    }

    handleLoadMore=()=>{
        this.fetchVideos();
    }


    renderHeading(){
        return this.props.heading? <div className="video-wrapper">
            <strong>{this.props.heading.split(' ')[0].toString()}</strong> {this.props.heading.split(' ')[1].toString()}
        </div> : null;
    }

    render(){
        return(
            <div>
            {this.renderHeading()}
            <VideoTemplate videoList={this.state.videoList} type={this.props.type} teams={this.state.teams}/>
            <LoadMore loadMore end={this.state.end} length={this.state.length} text="Load More Videos" OnClick={this.handleLoadMore}/>
            </div>
        )
    }
}

export default VideoList;