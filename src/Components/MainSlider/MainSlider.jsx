import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Slider from "react-slick";
import Loading from "../Loading/Loading";

export default function MainSlider() {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 1500,
        slidesToShow: 6, // الافتراضي على الشاشات الكبيرة
        slidesToScroll: 1,
        arrows: false,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024, // الأجهزة المتوسطة (md)
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768, // الأجهزة الصغيرة (sm)
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480, // الهواتف
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    function getSlider() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }

    const { data, isLoading } = useQuery({
        queryKey: "MainSlider",
        queryFn: getSlider,
    });

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <Slider {...settings}>
                    {data?.data.data.map((categorie, index) => (
                        <div key={index} className="lg:block">
                            <img
                                className="h-[200px] w-full object-cover object-top"
                                src={categorie.image}
                                alt={categorie.name}
                            />
                            <h3 className="text-2xl text-center">{categorie?.name}</h3>
                        </div>
                    ))}
                </Slider>
            )}
        </>
    );
}
