import React, { useContext, useState } from 'react'
import * as Yup from 'yup';
import { Button } from '@heroui/button';
import { Input } from "@heroui/input";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContextProvider';


export default function Register() {

  const [apiErrors, setApiErrors] = useState()
  const [isLoding, setisLoding] = useState(false)
  const navigate = useNavigate()

  const {setUserToken} =useContext(UserContext)

  const validationSchema = Yup.object({
    name: Yup.string().required("the name is required").min(3, "the min length is 3").max(20, "the max length is 20"),
    email: Yup.string().required("the email is required").email("the email is invaled"),
    password: Yup.string().required("the password is required"),
    rePassword: Yup.string().required("the rePassword is required").oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string().required("the phone is required")
  })
  async function onSubmit(values) {
    try {
      setisLoding(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      localStorage.setItem("token",data.token) 
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit,
  });

  return <>
    <div className="container  mx-auto">
      <h1 className='text-center mb-4 my-2 text-[#0aad0a]'>Register now</h1>
      <div className=' w-[70%] col-span-2 mx-auto text-center mb-5'>
        {apiErrors && <p className="bg-red-700  p-3 rounded-lg text-white ">{apiErrors}</p>}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Input name='name' label="name" value={values.name} onChange={handleChange} onBlur={handleBlur} className='col-span-2 w-[70%] mx-auto' type="namw" />
          <div className=' w-[70%] col-span-2 mx-auto'>
            {errors.name && touched.name && <p className="bg-red-700  p-3 rounded-lg text-white ">{errors.name}</p>}
          </div>
          <Input name='email' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.email} label="Email" type="email" />
          <div className=' w-[70%] col-span-2 mx-auto'>
            {errors.email && touched.email && <p className="bg-red-700 p-3 rounded-lg text-white ">{errors.email}</p>}
          </div>
          <Input name='password' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.password} label="password" type="password" />
          <div className=' w-[70%] col-span-2 mx-auto'>
            {errors.password && touched.password && <p className="bg-red-700 p-3 rounded-lg text-white ">{errors.password}</p>}
          </div>
          <Input name='rePassword' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.rePassword} label="rePassword" type="password" />
          <div className=' w-[70%] col-span-2 mx-auto'>
            {errors.rePassword && touched.rePassword && <p className="bg-red-700 p-3 rounded-lg text-white ">{errors.rePassword}</p>}
          </div>
          <Input name='phone' className='col-span-2 w-[70%] mx-auto' value={values.phone} onChange={handleChange} label="phone" type="tel" />
          <div className=' w-[70%] col-span-2 mx-auto'>
            {errors.phone && touched.phone && <p className="bg-red-700 p-3 rounded-lg text-white ">{errors.phone}</p>}
          </div>
          {isLoding ?
            <Button className='col-span-2 w-[70%] mx-auto bg-[#0aad0a]'><i className="fa-solid fa-spinner text-2xl fa-spin"></i></Button>
            :
            <Button type='submit' className='text-white text-[16px] font-semibold col-span-2 w-[70%] mx-auto bg-[#0aad0a]'>Register</Button>
          }
        </div>
      </form>
    </div>
  </>
}
















































// import { Button } from "@heroui/button";
// import { Input } from "@heroui/input";
// import axios from "axios";
// import { useFormik } from "formik";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";

// export default function Register() {
//   const [apiError, setApiErrors] = useState(null);
//   const [isLoding, setIsLodings] = useState(false);
//   const navigate = useNavigate()

//   async function onSubmit(values) {
//     try {
//       setIsLodings(true)
//       let { data } = await axios.post(
//         "https://ecommerce.routemisr.com/api/v1/auth/signup", values)
//       console.log(data);
//       navigate("/home")
//       setIsLodings(false)

//     } catch (err) {
//       setIsLodings(true)
//       console.log(err);
//       setApiErrors(err.response.data.message );
//       setIsLodings(false)
//     }
//   }

//   const validationSchema = Yup.object({
//     name: Yup.string()
//       .required("The name is required")
//       .min(3, "The minimum length is 3")
//       .max(20, "The maximum length is 20"),
//     email: Yup.string()
//       .required("The email is required")
//       .email("The email is invalid"),
//     password: Yup.string().required("The password is required"),
//     repassword: Yup.string()
//       .required("The re-password is required")
//       .oneOf([Yup.ref("password")], "Passwords must match"),
//     phone: Yup.string().required("The phone is required"),
//   });

//   const { handleSubmit, handleChange, handleBlur, errors, values, touched } =
//     useFormik({
//       initialValues: {
//         name: "Youssef nouh",
//         email:"Youssefnouh662003@gmail.com",
//         password:"Ahmed@123",
//         rePassword:"Ahmed@123",
//         phone:"01010700701"
//       },
//       onSubmit,
//       validationSchema,
//     });

//   return (
//     <>
//       <h1 className="text-center text-[#10ad10]">Register</h1>
//       {apiError && (
//         <p className="bg-red-600 text-white p-2 rounded-xl text-center col-span-2 w-[60%] mx-auto my-2">
//           {apiError && <p>{apiError}</p> }
//         </p>
//       )}
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-2 gap-4">
//           <Input
//             name="name"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.name}
//             className="col-span-2 w-[60%] mx-auto mt-1"
//             label="Name"
//             type="text"
//           />
//           {errors.name && touched.name && (
//             <p className="bg-red-600 text-white p-2 rounded-xl col-span-2 w-[60%] mx-auto">
//               {errors.name}
//             </p>
//           )}

//           <Input
//             name="email"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.email}
//             className="col-span-2 w-[60%] mx-auto mt-1"
//             label="Email"
//             type="email"
//           />
//           {errors.email && touched.email && (
//             <p className="bg-red-600 text-white p-2 rounded-xl col-span-2 w-[60%] mx-auto">
//               {errors.email}
//             </p>
//           )}

//           <Input
//             name="password"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.password}
//             className="col-span-1 w-[60%] ms-auto mt-1"
//             label="Password"
//             type="password"
//           />

//           <Input
//             name="rePassword"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.rePassword}
//             className="col-span-1 w-[60%] me-auto mt-1"
//             label="Confirm Password"
//             type="password"
//           />
//           {errors.password && touched.password && (
//             <p className="bg-red-600 text-white p-2 rounded-xl col-span-2 w-[60%] mx-auto">
//               {errors.password}
//             </p>
//           )}
//           {errors.rePassword && touched.rePassword && (
//             <p className="bg-red-600 text-white p-2 rounded-xl col-span-2 w-[60%] mx-auto">
//               {errors.rePassword}
//             </p>
//           )}

//           <Input
//             name="phone"
//             onChange={handleChange}
//             onBlur={handleBlur}
//             value={values.phone}
//             className="col-span-2 w-[60%] mx-auto mt-1"
//             label="Phone"
//             type="tel"
//           />
//           {errors.phone && touched.phone && (
//             <p className="bg-red-600 text-white p-2 rounded-xl col-span-2 w-[60%] mx-auto">
//               {errors.phone}
//             </p>
//           )}
//             {isLoding?
//             <Button  className='col-span-2 w-[60%] mx-auto bg-[#0aad0a]'><i className="fa-solid fa-spinner text-2xl fa-spin"></i></Button>
//           :
//           <Button
//             type="submit"
//             className="col-span-2 w-[60%] mx-auto mt-1 bg-[#10ad10]"
//             color="primary">
//             Register
//           </Button>
//           }
          
//         </div>
//       </form>
//     </>
//   );
// }



























// import React, { useState } from 'react'
// import * as Yup from 'yup';
// import { Button } from '@heroui/button';
// import {Input} from "@heroui/input";
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Register() {
//   const navigate = useNavigate()

//   const [apiErrors,setApiErrors] = useState()
//   const [isLoding,setisLoding] = useState(false)
  
//   // function validate(values) {
//   //   let errors = {};
    
//   //   if (!values.name) {
//   //     errors.name = "This field is required";
//   //   } else if (values.name.length < 3) {
//   //     errors.name = "The minimum length is 3";
//   //   } else if (values.name.length > 20) {
//   //     errors.name = "The maximum length is 20";
//   //   }
//   //   if (!values.email) {
//   //     errors.email = "This field is required";
//   //   } 
    
//   //   if (!values.password) {
//   //     errors.password = "This field is required";
//   //   } else if (values.password.length < 3) {
//   //     errors.password = "The minimum length is 3";
//   //   } else if (values.password.length > 30) {
//   //     errors.password = "The maximum length is 30";
//   //   }
    
//   //   if (!values.rePassword) {
//   //     errors.rePassword = "This field is required";
//   //   } else if (values.rePassword.length < 3) {
//   //     errors.rePassword = "The minimum length is 3";
//   //   } else if (values.rePassword.length > 30) {
//   //     errors.rePassword = "The maximum length is 30";
//   //   }
//   //   if (!values.phone) {
//   //     errors.phone = "This field is required";
//   //   } else if (values.phone.length != 11) {
//   //     errors.phone = "The length is 11 number";
//   //   }
    
//   //   return errors;
//   // }
//   const validationSchema =  Yup.object({
//     name : Yup.string().required("the name is required").min(3,"the min length is 3").max(20,"the max length is 20"),
//     email : Yup.string().required("the email is required").email("the email is invaled"),
//     password : Yup.string().required("the password is required"),
//     rePassword : Yup.string().required("the rePassword is required"),
//     phone : Yup.string().required("the phone is required")
//   })
//   async function onSubmit(values) {
//     try{
//       setisLoding(true)
//       let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
//       console.log(data);
//       navigate('/home')
//       setisLoding(false)
//     }
//     catch(err){
//       setisLoding(true)
//       setisLoding
//       console.log(err.response.data.message);
//       setApiErrors(err.response.data.message)
//       setisLoding(false)
//     }
//   }
  
//   const { handleSubmit, handleChange, handleBlur, errors, values , touched} = useFormik({
//     initialValues: {
//       name: "",
//       email: "ahmedmuttii404@gmail.com",
//       password: "Ahmed@123",
//       rePassword: "Ahmed@123",
//       phone: "01010700701",
//     },
//     validationSchema,
//     onSubmit,
//   });
  
//   return <>
//     <div className="container mx-auto">
//       <h1 className='text-center mb-4 text-[#0aad0a]'>Register</h1>
//       <div className=' w-[70%] col-span-2 mx-auto text-center mb-5'>
//             {apiErrors && <p  className="bg-red-700  p-3 rounded-lg text-white ">{apiErrors}</p>}
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="grid grid-cols-2 gap-4">
//           <Input name='name' label="name" value={values.name} onChange={handleChange} onBlur={handleBlur}  className='col-span-2 w-[70%] mx-auto' type="namw" />
//           <div className=' w-[70%] col-span-2 mx-auto'>
//             {errors.name && touched.name && <p  className="bg-red-700  p-3 rounded-lg text-white ">{errors.name}</p>}
//           </div>
//           <Input name='email' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.email} label="Email" type="email" />
//           <div className=' w-[70%] col-span-2 mx-auto'>
//             {errors.email && touched.email && <p  className="bg-red-700 p-3 rounded-lg text-white ">{errors.email}</p>}
//           </div>
//           <Input name='password' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.password} label="password" type="password" />
//           <div className=' w-[70%] col-span-2 mx-auto'>
//             {errors.password && touched.password && <p  className="bg-red-700 p-3 rounded-lg text-white ">{errors.password}</p>}
//           </div>
//           <Input name='rePassword' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.rePassword} label="rePassword" type="password" />
//           <div className=' w-[70%] col-span-2 mx-auto'>
//             {errors.rePassword && touched.rePassword && <p  className="bg-red-700 p-3 rounded-lg text-white ">{errors.rePassword}</p>}
//           </div>
//           <Input name='phone' className='col-span-2 w-[70%] mx-auto' value={values.phone}  onChange={handleChange}  label="phone" type="tel" />
//           <div className=' w-[70%] col-span-2 mx-auto'>
//             {errors.phone && touched.phone && <p className="bg-red-700 p-3 rounded-lg text-white ">{errors.phone}</p>}
//           </div>
//           {isLoding?
//           <Button  className='col-span-2 w-[70%] mx-auto bg-[#0aad0a]'><i className="fa-solid fa-spinner fa-spin"></i>
//           </Button>
//           :
//           <Button type='submit' className='col-span-2 w-[70%] mx-auto bg-[#0aad0a]'>Register</Button>
//         }
          
//         </div>
//       </form>
//     </div>
//   </> 
// }









































/* import React from 'react';
import { Input } from "@heroui/react";
import { Button } from "@heroui/react";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate(); // استخدم useNavigate بدلاً من Navigate

    const { handleSubmit, handleChange, errors, touched, values } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        },
        onSubmit: () => {
            console.log(values);
            navigate("/login"); // التنقل إلى صفحة تسجيل الدخول
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required("The Name is Required")
                .min(3, "The minimum length is 3")
                .max(20, "The maximum length is 20"),
            email: Yup.string()
                .required("The Email is Required")
                .email("Invalid Email"),
            password: Yup.string()
                .required("Password is Required")
                .min(6, "Password must be at least 6 characters"),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password'), null], "Passwords must match")
                .required("Confirm Password is Required"),
            phone: Yup.string()
                .required("Phone number is Required")
                .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
        }),
    });

    return (
        <>
            <div className="mt-14 mx-auto container">
                <form onSubmit={handleSubmit} className='w-[70%] mx-auto grid grid-cols-2 gap-4'>
                    <Input onChange={handleChange} value={values.name} name='name' className='col-span-2' label="Name" type="text" />
                    {errors.name && touched.name && <p className="text-red-500">{errors.name}</p>}

                    <Input onChange={handleChange} value={values.email} name='email' className='col-span-2' label="Email" type="email" />
                    {errors.email && touched.email && <p className="text-red-500">{errors.email}</p>}

                    <Input onChange={handleChange} value={values.password} name='password' className='col-span-1' label="Password" type="password" />
                    {errors.password && touched.password && <p className="text-red-500">{errors.password}</p>}

                    <Input onChange={handleChange} value={values.rePassword} name='rePassword' className='col-span-1' label="Confirm Password" type="password" />
                    {errors.rePassword && touched.rePassword && <p className="text-red-500">{errors.rePassword}</p>}

                    <Input onChange={handleChange} value={values.phone} name='phone' className='col-span-2' label="Phone" type="tel" />
                    {errors.phone && touched.phone && <p className="text-red-500">{errors.phone}</p>}

                    <Button type='submit' className='col-span-2' color="primary">
                        Register
                    </Button>
                </form>
            </div>
        </>
    );
}
*/




























































