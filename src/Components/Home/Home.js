import React from 'react';

import SlickSlider from '../Widgets/SlickSlider/SlickSlider';
import  NewsList from '../Widgets/NewsList/NewsList';
import VideoList from '../Widgets/VideoList/VideoList';

class Home extends React.Component{

    render(){
        return(
            <React.Fragment>
                <SlickSlider start={0} end={3} limit={3} settings={{dots:false}} type="featured" />
                <NewsList start={0} end={3} limit={3}  type="card"/>
                <VideoList start={0} end={3} limit={3}  type="card" heading="NBA Videos"/>
            </React.Fragment>
        )
    }
}

export default Home;