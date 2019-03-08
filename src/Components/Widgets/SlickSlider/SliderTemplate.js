import React from 'react';
import Slider from 'react-slick';

import {Link} from 'react-router-dom';

import  './SlickSlider.css';

class SliderTemplate extends React.Component{

    settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:false,
        arrows:false,
        ...this.props.settings
      };

    renderSlides(){
        switch(this.props.type){
            case "featured": const data =this.props.slideData.map((item, index)=>{
                                return(
                                    <div key={index}>
                                        <div className="featured_item">
                                            <div className="featured_image" style={{background:`linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)), url('/images/articles/${item.image}')`}} >
                                            </div>
                                            <Link to={`/articles/${item.id}`} className="featured_title">
                                                {item.title}
                                            </Link>
                                        </div>
                                    </div>
                                )
            })
            return data;
            default: return <div>Nothing here till yet!</div>;
        }
    }
    
    
    render(){
        // console.log(this.props.slideData);
        return(
                <Slider {...this.settings}>
                        {this.renderSlides()}
                </Slider>
        );
    }
}

export default SliderTemplate;