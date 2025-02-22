import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import * as React from "react";
import {HeroUIProvider} from "@heroui/react";
import UserContextProvider from './Components/Context/UserContextProvider.jsx'
import ProdectedRoute from './Components/ProdectedRoute/ProdectedRoute.jsx'
import ProdectDetals from './Components/ProdectDetals/ProdectDetals.jsx'
import Loading from './Components/Loading/Loading.jsx'
import CardContextProvider from './Components/CardContext/CardContext.jsx'
import { Toaster } from 'react-hot-toast'
import Checkout from './Components/Checkout/Checkout.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishList from './Components/WishList/WishList.jsx'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword.jsx'
import VerifyResetCode from './Components/VerifyResetCode/VerifyResetCode.jsx'
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx'


let routers = createBrowserRouter([{
  path:'' , element : <Layout/>,children:[
    {path: "/register" , element: <Register/>},
    {path:'login' , element: <Login/>},
    {path:'loading' , element: <Loading/>},
    {path:'ForgotPassword' , element: <ForgotPassword/>},
    {path:'VerifyResetCode' , element: <VerifyResetCode/>},
    {path:'ResetPassword' , element: <ResetPassword/>},
    {path:'home' , element:<ProdectedRoute><Home/></ProdectedRoute> },
    {index: true  , element:<ProdectedRoute><Home/></ProdectedRoute> },
    {path:'cart' , element: <ProdectedRoute><Cart/></ProdectedRoute> },
    {path:'brands' , element: <ProdectedRoute><Brands/></ProdectedRoute> },
    {path:'WishList' , element: <ProdectedRoute><WishList/></ProdectedRoute> },
    {path:'categories' , element: <ProdectedRoute><Categories/></ProdectedRoute> },
    {path:'Checkout' , element: <ProdectedRoute><Checkout/></ProdectedRoute> },
    {path:'AllOrders' , element: <ProdectedRoute><AllOrders/></ProdectedRoute> },
    {path:'products' , element: <ProdectedRoute><Products/></ProdectedRoute> },
    {path:'ProdectDetals/:id' , element: <ProdectedRoute><ProdectDetals/></ProdectedRoute> },
    {path:'*' , element: <NotFound/>},
  ]
}])

const queryClient = new QueryClient()
function App() {
  return <>
  <QueryClientProvider client={queryClient}>
    <CardContextProvider>
      <UserContextProvider>
        <HeroUIProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster />
          {/* <ReactQueryDevtools initialIsOpen={false} />   */}
        </HeroUIProvider> 
      </UserContextProvider>
    </CardContextProvider>
  </QueryClientProvider>
  </>
}

export default App
