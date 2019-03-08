import React from 'react';
import {firebaseArticles, firebaseLooper} from '../../../firebase';

import SliderTemplate from './SliderTemplate';

class SlickSlider extends React.Component{
    
    state={slideData:[]}

     componentDidMount(){
        
        firebaseArticles.orderByChild('id').startAt(this.props.start).endAt(this.props.end-1).once('value')
        .then((snapshot)=> {
            const data = firebaseLooper(snapshot);
            this.setState({slideData:data});
        })

     }

    render(){
        return(
            <SliderTemplate settings={this.props.settings} slideData={this.state.slideData} type={this.props.type} />
        )
    }
}

export default SlickSlider;