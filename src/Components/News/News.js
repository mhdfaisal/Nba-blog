import React from 'react';
import SlickSlider from '../Widgets/SlickSlider/SlickSlider';
import NewsList from '../Widgets/NewsList/NewsList';
class News extends React.Component{

    render(){
        return(
            <React.Fragment>
                <SlickSlider type="featured" start={0} end={3} limit={3} />
                <NewsList start={0} end={4} limit={4} type="imageCard"/>
            </React.Fragment>
        )
    }
}

export default News;