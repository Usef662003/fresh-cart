import React, { useState } from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';

export default function Brands() {
  function getAllBrand() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  const [detaild, setDetaild] = useState(11)
  const { data, isLoading, error } = useQuery({
    queryKey: ["recentProdect"],
    queryFn: getAllBrand,
  });
  console.log("data", data?.data?.data._id);



  return <div>{isLoading ? <Loading /> :
    <div className='relative '>
      <h1 className=' text-center text-[27px] py-5 font-semibold text-[#4fa74f]'>All Brands</h1>
      <div className="container mx-auto my-5">
        <div className="grid grid-cols-6 gap-6">
          {data?.data?.data?.map((item, index) => 
            <div  key={index} className="py-6 col-span-6 sm:col-span-3 md:col-span-2  lg:col-span-1 flex flex-col hover:shadow-lg hover:shadow-slate-400 hover:translate-y-0.5 transition-all border border-[#d1d1d1]">
              <div className="w-[60%] me-auto md:w-[100%]">
                <img src={item?.image} className='w-full ' alt={item.name} />
              </div>
              <h3 className='text-center text-[14px]'>{item?.name}</h3>
            </div>
          )}
        </div>
      </div>
      {/* <div className=" absolute top-0 right-0 left-0  h-full  bg-slate-700  bg-opacity-50 flex justify-center items-center">
        <div className=" w-[25%] h-[25%]">
          {data?.data?.data?.map((item, index) => 
          <img src={item?.image} className='w-full ' key={index} alt={item.name} />
          ) }
        </div>
      </div> */}
    </div>}
  </div>

}
