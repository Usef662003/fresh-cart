import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import { Button } from '@heroui/button';
import { Input } from "@heroui/input";
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContextProvider';

export default function Login() {
  const [apiErrors, setApiErrors] = useState()
  const [isLoding, setisLoding] = useState(false)
  const navigate = useNavigate()

  const { setUserToken } = useContext(UserContext)


  const validationSchema = Yup.object({
    email: Yup.string().required("the email is required").email("the email is invaled"),
    password: Yup.string().required("the password is required"),
  })
  async function onSubmit(values) {
    try {
      setisLoding(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      localStorage.setItem("token", data.token)
      setUserToken(data.token)
      setisLoding(false)
      navigate('/home')
    }
    catch (err) {
      setisLoding(true)
      console.log(err.response.data.message);
      setApiErrors(err.response.data.message)
      setisLoding(false)
    }
  }

  const { handleSubmit, handleChange, handleBlur, errors, values, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return <>
    <div className="container mx-auto">
      <h1 className='text-center mb-4 text-[#0aad0a]'>Login now </h1>
      <div className=' w-[70%] col-span-2 mx-auto text-center mb-5'>
        {apiErrors && <p className="bg-red-700  p-3 rounded-lg text-white ">{apiErrors}</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Input name='email' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.email} label="Email" type="email" />
          <div className=' w-[70%] col-span-2 mx-auto'>
            {errors.email && touched.email && <p className="bg-red-700 p-3 rounded-lg text-white ">{errors.email}</p>}
          </div>
          <Input name='password' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.password} label="password" type="password" />
          <div className=' w-[70%] col-span-2 mx-auto'>
            {errors.password && touched.password && <p className="bg-red-700 p-3 rounded-lg text-white ">{errors.password}</p>}
          </div>
          <div className='col-span-2 w-[70%] mx-auto'>
            <Link className='col-span-1 ms-auto  w-fit border-[#0aad01] duration-200'  to={"/ForgotPassword"}>Forgot your Password ?</Link>
          </div>
          {isLoding ?
            <Button className='col-span-2 w-[70%] mx-auto bg-[#0aad0a]'><i className="fa-solid fa-spinner text-2xl fa-spin"></i></Button>
            :
            <Button type='submit' className='col-span-2 w-[70%] mx-auto bg-[#0aad0a]'>Login</Button>
          }
        </div>
      </form>
    </div>
  </>
}
