import React, { useContext } from 'react'
import style from './Cart.module.css'
import { CardContext } from '../CardContext/CardContext'
import Loading from '../Loading/Loading'
import axios from 'axios'
import { Button } from '@heroui/button'
import { Link } from 'react-router-dom'

export default function Cart() {
  let { card, removeProductToCard, updataProductToCard ,setCard,reoveAllofProductInCard } = useContext(CardContext)
  
  return <>{card ?
    <div className="relative text-black overflow-x-auto shadow-md sm:rounded-lg container mx-auto my-5">
      <div className="grid grid-cols-5 my-5 text-center">
        <div className="col-span-3">
          <h2>Total Price : <span className='text-[#10ad10]'>{card?.data?.totalCartPrice} EGP</span></h2>
        </div>
        <div className="col-span-2">
          <Link to={"/Checkout"}><Button className='col-span-1 w-[70%] mx-auto text-xl bg-[#0aad0a]'>Check Out</Button></Link>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">

        <tbody>
          {card?.data?.products?.map((prodect, index) =>
            <tr key={index} className="bg-white border-b  text-black border-gray-200 hover:bg-gray-50">
              <td className="p-4 ">
                <img src={prodect.product.imageCover} className="w-16 md:w-32  text-black max-w-full max-h-full" alt={prodect.product.title} />
              </td>
              <td className="px-6 py-4 font-semibold space-y-2 text-gray-900 ">
                <h2 className='text-[#212529] text-[20px] font-[500]'>{prodect.product.title} </h2>
                <h2 className='text-[#22db14] text-[18px] font-[500]'>{prodect?.price} EGP</h2>
              </td>
              <td className="px-6 py-4 text-black">
                <div className="flex items-center">
                  <button onClick={() => updataProductToCard(prodect.product.id, prodect.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <span type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 text-center focus:border-blue-500 block px-2.5 py-1 " placeholder={99} required >
                      {prodect.count}
                    </span>
                  </div>
                  <button onClick={() => updataProductToCard(prodect.product.id, prodect.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {prodect?.price * prodect?.count}$
              </td>
              <td className="px-6 py-4">
                <button onClick={() => removeProductToCard(prodect.product.id)} href="#" className="bg-red-600 hover:bg-black duration-200 hover:text-red-600 text-white"><i className="fa-solid fa-trash-can"></i> Remove</button>
              </td>
            </tr>)}
        </tbody>
      </table>
      <div className="">
        <button className='bg-red-600 hover:bg-black duration-200 hover:text-red-600 w-full py-3' onClick={() => reoveAllofProductInCard()} ><i className="fa-solid fa-trash-can"></i> Delete All Of Prodect </button>
      </div>
    </div> :
    <Loading />
  }
  </>
}
