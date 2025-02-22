import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CardContext = createContext(null);

export default function CardContextProvider({ children }) {
    const [card, setCard] = useState(null);
    const token = localStorage.getItem("token");
    const headers = token ? { token } : {};
    
    useEffect(()=>{
        getProductToCard()
    },[])
    async function getProductToCard() {
        try {
            let { data } = await axios.get(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { headers }
            );

            // console.log(data);
            setCard(data);      
        } catch (err) {
            console.error("Error adding product to cart:", err);
        }
    }
    async function updataProductToCard(productId , count) {
        try {
            let { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { "count": `${count}`},
                { headers }
            );
            setCard(data) 
            toast.success('update data')    
        } catch (err) {
            console?.error("Error adding product to cart:", err);
        }
    }
    async function removeProductToCard(productId) {
        try {
            let { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { headers }
            );
            console.log(data);
            toast('remove item')
            setCard(data)
        } catch (err) {
            console.error("Error adding product to cart:", err);
        }
    }
    async function addProductToCard(productId) {
        try {
            let { data } = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { productId },
                { headers }
            );
            console.log(data);
            getProductToCard()
            toast.success('Add Prodect', {
                duration: 2000,
                position: 'right-top', 
                removeDelay:500,
                iconTheme: {
                    primary: '#10ad10',
                    secondary: '#000',
                }
            })
            // getProductToCard()
        } catch (err) {
            console.error("Error adding product to cart:", err);
        }
    }
    async function reoveAllofProductInCard() {
        try {
            let { data } = await axios.delete(
                "https://ecommerce.routemisr.com/api/v1/cart",
                { headers }
            );
            console.log(data);
            getProductToCard()
            toast.success('Remove all cart', {
                duration: 2000,
                position: 'right-top',
                removeDelay:500,
                iconTheme: {
                    primary: '#10ad10',
                    secondary: '#000',
                }
            })
        } catch (err) {
            console.error("Error adding product to cart:", err);
        }
    }

    return (
        <CardContext.Provider value={{ addProductToCard, card, setCard,updataProductToCard ,removeProductToCard, reoveAllofProductInCard }}>
            {children}
        </CardContext.Provider>
    );
}
