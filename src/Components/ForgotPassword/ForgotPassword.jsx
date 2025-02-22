import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import { Button } from '@heroui/button';
import { Input } from "@heroui/input";
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function ForgotPassword() {


    const [isLoding, setisLoding] = useState(false)
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        email: Yup.string().required("the email is required").email("the email is invaled"),
    })
    async function onSubmit(values) {
        try {
            setisLoding(true)
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
            console.log(data);
            setisLoding(false)
            navigate('/VerifyResetCode')
        }
        catch (err) {
            setisLoding(true)
            console.log(err.response.data.message);
            setisLoding(false)
        }
    }

    const { handleSubmit, handleChange, handleBlur, errors, values, touched } = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,
        onSubmit,
    });

    return <>
        <div className="container mx-auto">
            <h1 className='text-center mb-4 text-[#0aad0a]'>Forgot Password</h1>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <Input name='email' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.email} label="Email" type="email" />
                    <div className=' w-[70%] col-span-2 mx-auto'>
                        {errors.email && touched.email && <p className="bg-red-700 p-3 rounded-lg text-white ">{errors.email}</p>}
                    </div>

                    {isLoding ?
                        <Button className='col-span-2 w-[70%] mx-auto bg-[#0aad0a]'><i className="fa-solid fa-spinner text-2xl fa-spin"></i></Button>
                        :
                        <Button type='submit' className='col-span-2 text-lg w-[70%] mx-auto bg-[#0aad0a]'>Next</Button>
                    }
                </div>
            </form>
        </div>
    </>
}
