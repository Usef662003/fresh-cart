import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { CardContext } from '../CardContext/CardContext';
import Loading from '../Loading/Loading';
import Prodect from '../Prodect/Prodect';
import RelatedOfProdectDeteles from '../RelatedOfProdectDeteles/RelatedOfProdectDeteles';



export default function ProdectDetals({}) {
    const [catagoryProdect, setCatagoryProdect] = useState([])

    const [prodect, setProdect] = useState(null)
    let { addProductToCard, card, setCard } = useContext(CardContext)
    const [loading, setLoading] = useState(false)

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
    };

    async function getCategoryOfProdect(categoryId) {
        let { data } = await axios?.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`)
        setCatagoryProdect(data?.data)
        console.log(data?.data);
        (data?.data)
        setCard(data)
        
        // setCard(catagoryProdect)
    }




    const { id } = useParams()
    async function getProdect(id) {
        setLoading(true)
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setProdect(data.data)
        getCategoryOfProdect(data?.data?.category?._id)
        setLoading(false)
    }
    useEffect(() => {
        getProdect(id)
    }, [])
    return (<>
        {loading ?
            <Loading />
            : <>
                <div className="grid grid-cols-6  w-full items-center container mx-auto ">
                    <div className="col-span-6 md:col-span-2 p-6 ">
                        <Slider {...settings}>
                            {
                                prodect?.images?.map((images, index) =>
                                    <div key={index}>
                                        <img src={images} className='w-full ' alt="" />
                                    </div>
                                )
                            }
                        </Slider>
                    </div>
                    <div className="col-span-6 md:col-span-4 ps-6">
                        <h2>{prodect?.title}</h2>
                        <p>{prodect?.description}</p>
                        <div className="flex justify-between">
                            <h3>{prodect?.price}EGP</h3>
                            <h3><i className="fa-solid fa-star text-yellow-400 "> {prodect?.ratingsAverage}</i></h3>
                        </div>
                        <button onClick={() => addProductToCard(prodect?.id)} className='btn w-full'>Add to Cart</button>
                    </div>
                </div>
                <RelatedOfProdectDeteles prodects={catagoryProdect} /></>
        }
    </>

    )
}
