import React, { useContext, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContextProvider'
import { CardContext } from '../CardContext/CardContext'

export default function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  let { userToken, setUserToken } = useContext(UserContext)
  let { card } = useContext(CardContext)
  function logout() {
    setUserToken(null)
    localStorage.removeItem('token')
    navigate('/login')
  }
  return <>
    <div className="mb-[52px]">

      <header className="bg-gray-200 fixed inset-x-0 top-0 z-50 ">
        <nav className="flex items-center justify-between px-6 py-3  lg:px-8 container" aria-label="Global">
          <Link to={'home'} className="lg:pe-4">
            <span className="sr-only">Your Company</span>
            <div className="flex items-center">
              <h2 className='text-black text-[25px] font-semibold'><i className="pt-2 fa-solid fa-cart-shopping text-[#4fa74f] text-[28px] font-semibold"></i> fresh cart</h2>
            </div>
          </Link>
          <div onClick={() => setIsOpen(true)} className="flex  lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 bg-transparent hover:bg-gray-100">
              <span className="sr-only">Open main menu</span>
              <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-2 capitalize space-x-1 text-lg ">
            {userToken &&
              <>
              <NavLink to={'home'} className="text-[#000c] text-[14px] hover:font-[600] hover:text-[16px] duration-200 font-[400] hover:text-[#4ea64e]">home</NavLink>
                <NavLink to={'cart'} className="text-[#000c] text-[14px] hover:font-[600] hover:text-[16px] duration-200 font-[400] hover:text-[#4ea64e] ">Cart</NavLink>
                <NavLink to={'WishList'} className="text-[#000c] text-[14px] hover:font-[600] hover:text-[16px] duration-200 font-[400] hover:text-[#4ea64e]">WishList</NavLink>
                <NavLink to={'products'} className="text-[#000c] text-[14px] hover:font-[600] hover:text-[16px] duration-200 font-[400] hover:text-[#4ea64e]">products</NavLink>
                <NavLink to={'categories'} className="text-[#000c] text-[14px] hover:font-[600] hover:text-[16px] duration-200 font-[400] hover:text-[#4ea64e]">categories</NavLink>
                <NavLink to={'brands'} className="text-[#000c] text-[14px] hover:font-[600] hover:text-[16px] duration-200 font-[400] hover:text-[#4ea64e]">brands</NavLink>
                <NavLink to={'AllOrders'} className="text-[#000c] text-[14px] hover:font-[600] hover:text-[16px] duration-200 font-[400] hover:text-[#4ea64e]">AllOrders</NavLink>
              </>}
          </div>
          <div className="hidden lg:flex lg:justify-end space-x-3 items-center">
            {userToken ? <>
              <NavLink to={'cart'} className="text-[#000c] text-[25px] duration-150 font-[900] hover:text-[#4ea64e] relative  group mx-2"><i className="fa-solid fa-cart-shopping text-[#000c] text-[25px] duration-150 font-[900] hover:text-[#4ea64e]"></i><span className=' text-white text-[11px] font-[700] fa-md absolute -right-1.5 -top-1  rounded-2xl py-0.5 px-1.5  group-hover:bg-[#000c] duration-150  bg-[#4ea64e] '>{card?.numOfCartItems}</span> </NavLink>
              <a onClick={() => logout()} className="text-[#000c] text-[14px] hover:font-[600] hover:text-[16px] duration-200 font-[400] hover:text-[#4ea64e]">Log Out</a>
            </>
              : <>
                <NavLink to={'Register'} className="text-[#000c] text-[14px] hover:font-[600] hover:text-[16px] duration-200 font-[400] hover:text-[#4ea64e]">Register</NavLink>
                <NavLink to={'login'} className="text-[#000c] text-[14px] hover:font-[600] hover:text-[16px] duration-200 font-[400] hover:text-[#4ea64e]">Login</NavLink>
              </>
            }
          </div>
        </nav>
        {/* Mobile menu, show/hide based on menu open state. */}
        <div className={isOpen ? "lg:hidden" : "hidden"} role="dialog" aria-modal="true">
          {/* Background backdrop, show/hide based on slide-over state. */}
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to={'home'} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <h2 className='text-black text-[25px] font-semibold'><i className="pt-2 fa-solid fa-cart-shopping text-[#4fa74f] text-[28px] font-semibold"></i> fresh cart</h2>
              </NavLink>
              <button onClick={() => setIsOpen(false)} type="button" className="-m-2.5  bg-transparent hover:bg-gray-100 rounded-md p-2.5 text-gray-700">
                <span className="sr-only">Close menu</span>
                <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 text-start py-6">
                  {userToken &&
                    <> 
                      <NavLink to={'home'} className="text-[#000c] text-[14px]  font-[400] hover:font-[600] hover:text-[16px] duration-200 hover:text-[#4ea64e] block  rounded-lg">home</NavLink>
                      <NavLink to={'cart'} className="text-[#000c] text-[14px]  font-[400] hover:font-[600] hover:text-[16px] duration-200 hover:text-[#4ea64e] block  rounded-lg">cart</NavLink>
                      <NavLink to={'WishList'} className="text-[#000c] text-[14px]  font-[400] hover:font-[600] hover:text-[16px] duration-200 hover:text-[#4ea64e] block  rounded-lg">WishList</NavLink>
                      <NavLink to={'products'} className="text-[#000c] text-[14px]  font-[400] hover:font-[600] hover:text-[16px] duration-200 hover:text-[#4ea64e] block  rounded-lg">products</NavLink>
                      <NavLink to={'categories'} className="text-[#000c] text-[14px]  font-[400] hover:font-[600] hover:text-[16px] duration-200 hover:text-[#4ea64e] block  rounded-lg">categories</NavLink>
                      <NavLink to={'brands'} className="text-[#000c] text-[14px] font-[400] hover:font-[600] hover:text-[16px] duration-200 hover:text-[#4ea64e] block  rounded-lg">brands</NavLink>
                      <NavLink to={'AllOrders'} className="text-[#000c] text-[14px] font-[400] hover:font-[600] hover:text-[16px] duration-200 hover:text-[#4ea64e] block  rounded-lg">AllOrders</NavLink>
                    </>}
                </div>
                <div className="py-6 text-center">
                  {userToken ? <>
                    <NavLink to={'cart'} className="text-[#000c] text-[25px] duration-150 font-[900] hover:text-[#4ea64e] relative  group mx-2"><i className="fa-solid fa-cart-shopping text-[#000c] text-[25px] duration-150 font-[900] hover:text-[#4ea64e]"></i><span className=' text-white text-[11px] font-[700] fa-md absolute -right-1.5 -top-1  rounded-2xl py-0.5 px-1.5  group-hover:bg-[#000c] duration-150  bg-[#4ea64e] '>{card?.numOfCartItems}</span> </NavLink>
                    <a className="text-[#000c] hover:font-[600] hover:text-[16px] text-[14px] duration-200 font-[400] hover:text-[#4ea64e] block  rounded-lg">Log Out</a>
                  </>
                    :
                    <>
                      <NavLink to={'Register'} className="text-[#000c] hover:font-[600] hover:text-[16px]  text-[14px] duration-200 font-[400] hover:text-[#4ea64e] block rounded-lg">Register</NavLink>
                      <NavLink to={'login'} className="text-[#000c] text-[14px] duration-200 font-[400] hover:font-[600] hover:text-[16px]  hover:text-[#4ea64e] block  rounded-lg">Log in <span aria-hidden="true">→</span></NavLink>
                    </>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  </>
}
