import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { Button } from '@heroui/button';
import { Input } from "@heroui/input";
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContextProvider';
import Loading from '../Loading/Loading';

export default function ResetPassword() {
    const [isLoding, setisLoding] = useState(false);
    const navigate = useNavigate();
    const { setUserToken } = useContext(UserContext);

    // ✅ **تحسين الفاليديشن**
    const validationSchema = Yup.object({
        email: Yup.string()
            .required("The email is required")
            .email("Invalid email format")
            .trim(),
        newPassword: Yup.string()
            .required("The password is required")
            .min(6, "Password must be at least 6 characters"),
    });

    // ✅ **تحسين `onSubmit`**
    async function onSubmit(values) {
        setisLoding(true);
        try {
            let response = await axios.put(
                'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
                values
            );

            localStorage.setItem("token", response.data.token);
            setUserToken(response.data.token);
            navigate('/home');
        } catch (err) {
            console.error(err.response?.data?.message || "An error occurred");
        } finally {
            setisLoding(false);
        }
    }

    const { handleSubmit, handleChange, handleBlur, errors, values, touched } = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema,
        onSubmit,
    });

    return (
        <>
            {isLoding ? <Loading /> :
                <div className="container mx-auto">
                    <h1 className='text-center mb-4 text-[#0aad0a]'>Reset Password</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            {/* ✅ **إدخال البريد الإلكتروني** */}
                            <Input
                                name='email'
                                className='col-span-2 w-[70%] mx-auto'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                label="Email"
                                type="email"
                            />
                            {errors.email && touched.email && (
                                <p className="bg-red-700 p-3 rounded-lg text-white w-[70%] mx-auto">
                                    {errors.email}
                                </p>
                            )}

                            {/* ✅ **إدخال كلمة المرور الجديدة** */}
                            <Input
                                name='newPassword'
                                className='col-span-2 w-[70%] mx-auto'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.newPassword}
                                label="New Password"
                                type="password"
                            />
                            {errors.newPassword && touched.newPassword && (
                                <p className="bg-red-700 p-3 rounded-lg text-white w-[70%] mx-auto">
                                    {errors.newPassword}
                                </p>
                            )}

                            {/* ✅ **زر الإرسال مع حالة التحميل** */}
                            <Button
                                type='submit'
                                className='col-span-2 text-lg font-semibold text-white w-[70%] mx-auto bg-[#0aad0a]'
                                disabled={isLoding}
                            >
                                {isLoding ? <i className="fa-solid fa-spinner text-2xl fa-spin"></i> : "Next"}
                            </Button>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}











//     import React, { useContext, useState } from 'react'
// import * as Yup from 'yup';
// import { Button } from '@heroui/button';
// import { Input } from "@heroui/input";
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../Context/UserContextProvider';
// import Loading from '../Loading/Loading';


// export default function ResetPassword() {
//     // let {setUserToken}=useContext(UserContext)
//     const [isLoding, setisLoding] = useState(false)
//     const navigate = useNavigate()

//     const { setUserToken } = useContext(UserContext)


//     const validationSchema = Yup.object({
//         email: Yup.string().required("the email is required").email("the email is invaled"),
//         newPassword: Yup.string().required("the password is required"),
//     })
//     async function onSubmit(values) {
//         try {
//             setisLoding(true)
//             let respons = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
//             localStorage.setItem("token", respons?.token)
//             setUserToken(respons)
//             setisLoding(false)
//             navigate('/home')
//         }
//         catch (err) {
//             setisLoding(true)
//             console.log(err.response.data.message);
//             setisLoding(false)
//         }
//     }

//     const { handleSubmit, handleChange, handleBlur, errors, values, touched } = useFormik({
//         initialValues: {
//             email: "",
//             newPassword: "",
//         },
//         validationSchema,
//         onSubmit,
//     });

//     return <>{isLoding?<Loading/>
//         :
//     <>

//         <div className="container mx-auto">
//             <h1 className='text-center mb-4 text-[#0aad0a]'>Reset Password</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="grid grid-cols-2 gap-4">
//                     <Input name='email' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.email} label="Email" type="email" />
//                     <div className=' w-[70%] col-span-2 mx-auto'>
//                         {errors.email && touched.email && <p className="bg-red-700 p-3 rounded-lg text-white ">{errors.email}</p>}
//                     </div>
//                     <Input name='newPassword' className='col-span-2 w-[70%] mx-auto' onChange={handleChange} onBlur={handleBlur} value={values.newPassword} label="newPassword" type="password" />
//                     <div className=' w-[70%] col-span-2 mx-auto'>
//                         {errors.newPassword && touched.newPassword && <p className="bg-red-700 p-3 rounded-lg text-white ">{errors.newPassword}</p>}
//                     </div>
//                     {isLoding ?
//                         <Button className='col-span-2 w-[70%] mx-auto bg-[#0aad0a]'><i className="fa-solid fa-spinner text-2xl fa-spin"></i></Button>
//                         :
//                         <Button type='submit' className='col-span-2 text-lg font-semibold text-white w-[70%] mx-auto bg-[#0aad0a]'>Next</Button>
//                     }
//                 </div>
//             </form>
//         </div>
//     </>
//     }   </>
// }
