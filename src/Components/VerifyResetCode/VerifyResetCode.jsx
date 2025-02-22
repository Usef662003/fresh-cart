import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import { Button } from '@heroui/button';
import { Input } from "@heroui/input";
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function VerifyResetCode() {
    
    const [isLoding, setisLoding] = useState(false)
    const navigate = useNavigate()

    const validationSchema = Yup.object({
        resetCode: Yup.string().required("the code is required")
    })
    async function onSubmit(values) {
        try {
            setisLoding(true)
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
            console.log(data);
            setisLoding(false)
            navigate('/ResetPassword')
        }
        catch (err) {
            setisLoding(true)
            console.log(err.response.data.message);
            setisLoding(false)
        }
    }

    const { handleSubmit, handleChange, handleBlur, errors, values, touched } = useFormik({
        initialValues: {
            resetCode: "",
        },
        validationSchema,
        onSubmit,
    });

    return <>
        <div className="container mx-auto">
            <h1 className='text-center mb-4 text-[#0aad0a]'>Forgot Password</h1>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    <Input name='resetCode' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.resetCode} label="code" type="text" />
                    <div className=' w-[70%] col-span-2 mx-auto'>
                        {errors.resetCode && touched.resetCode && <p className="bg-red-700 p-3 rounded-lg text-white ">{errors.resetCode}</p>}
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
