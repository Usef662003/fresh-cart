import React, { useContext, useState } from 'react'
import { Button } from '@heroui/button';
import { Input } from "@heroui/input";
import { useFormik } from 'formik';
import axios from 'axios';
import { CardContext } from '../CardContext/CardContext';
import toast from 'react-hot-toast';

export default function Checkout() {
    const [isLoding, setisLoding] = useState(false)

    const { card } = useContext(CardContext)


    async function onSubmit(shippingAddress) {
        try {

            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${card.cartId}?url=http://localhost:5173`, {
                shippingAddress
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            console.log(data);
            toast.success("success")
            location.href= data.session.url
            setisLoding(false)

        }
        catch (err) {
            setisLoding(true)
            console.log(err.response.data.message);
            setisLoding(false)
        }
    }

    const { handleSubmit, handleChange, handleBlur, errors, values, touched } = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: "",
        },
        onSubmit,
    });

    return <>
        <div className="container mx-auto my-5 mt-20">
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <Input name='details' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.details} label="details" type="text" />
                    <Input name='phone' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.phone} label="phone" type="tel" />
                    <Input name='city' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.city} label="city" type="text" />
                    {isLoding ?
                        <Button className='col-span-2 w-[70%] mx-auto bg-[#0aad0a]'><i className="fa-solid fa-spinner text-2xl fa-spin"></i></Button>
                        :
                        <Button type='submit' className='col-span-2 text-xl w-[70%] mx-auto bg-[#0aad0a]'>Pay</Button>
                    }
                </div>
            </form>
        </div>
    </>
}
