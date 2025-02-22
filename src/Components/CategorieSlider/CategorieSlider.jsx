import React from 'react'
import Slider from "react-slick";
import img1 from './../../assets/images/slider-image-1.jpeg'
import img2 from './../../assets/images/slider-image-2.jpeg'
import img3 from './../../assets/images/slider-image-3.jpeg'
import img4 from './../../assets/images/slider-2.jpeg'
import img5 from './../../assets/images/grocery-banner.png'

export default function CategorieSlider() {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        // centerMode: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplaySpeed: 2000,
    }
    return (
        <>
            <div className="flex m object-cover ">
                <div className="w-full md:w-3/4">
                    <Slider {...settings}>
                            <img className='w-full h-[400px] ' src={img1} alt="" />
                            <img className='w-full h-[400px] ' src={img2} alt="" />
                            <img className='w-full h-[400px] ' src={img3} alt="" />
                    </Slider>
                </div>
                <div className="w-0  md:w-1/2">
                    <img className='w-full h-[200px] object-cover ' src={img3} alt="" />
                    <img className='w-full h-[200px] object-cover' src={img2} alt="" />
                </div>
            </div>
        </>
    )
}
