import React from 'react'
// import Slider from "react-slick";
import { Link } from 'react-router-dom'
import { ref } from 'yup'


export default function RelatedOfProdectDeteles({ prodects } ) {
    return (<>
    <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 container mx-auto  ">
            {prodects.map((prodect, index)=>
        <div className="col-span-1">
                <div className="product rounded-2xl pt-2 my-3 mx-2">
                        <Link onClick={ref} to={`/ProdectDetals/${prodect?.id}`}>
                        {/* <div className=''> */}
                            <img className='w-full rounded-xl' src={prodect?.imageCover} alt={prodect.title} />
                            <div className="p-3">
                                <h3 className='text-[#10ad10]'>{prodect?.category?.name}</h3>
                                <h3 className='text-[#10ad10]'>{prodect?.id}</h3>
                                <h2 className='text-[#000] line-clamp-1 text-xl'>{prodect.title}</h2>
                                <div className="flex justify-between">
                                    <h4>{prodect.price}EGP</h4>
                                    <>
                                        <h4><i className="text-yellow-400 fa-solid fa-star"></i> {prodect.ratingsAverage}</h4>
                                    </>
                                {/* </div> */}
                            </div>
                        </div>
                    </Link>
                    <button className='btn w-full'>Add to Card</button>
                </div>
        </div>
        )}
    </div>
    </>)
}
