import React from 'react';
import {firebaseArticles, firebaseLooper} from '../../../firebase';

import SliderTemplate from './SliderTemplate';

class SlickSlider extends React.Component{
    
    state={startKey:'' , slideData:[]}

     componentDidMount(){
         let startKey = '';
         firebaseArticles.limitToFirst(1).once('value')
         .then((snapshot)=>{
            snapshot.forEach(childSnapshot =>{
                startKey = childSnapshot.key;
            });
            this.setState({startKey}, ()=>{
                this.loadSlideData()
            });
         })
     }

     loadSlideData = ()=>{
        firebaseArticles.orderByKey().startAt(this.state.startKey).limitToFirst(this.props.limit).once('value')
        .then(snapshot=>{
            const slideData = firebaseLooper(snapshot);
            this.setState({slideData});
        })
     }

    render(){
        return(
            <SliderTemplate settings={this.props.settings} slideData={this.state.slideData} type={this.props.type} />
        )
    }
}

export default SlickSlider;