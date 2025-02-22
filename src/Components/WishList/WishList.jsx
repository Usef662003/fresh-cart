import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { CardContext } from "../CardContext/CardContext";
import Loading from "../Loading/Loading";
// import { Reference } from "yup";

export default function WishList() {
    const token = localStorage.getItem("token");
    const headers = token ? { token } : {};
    const { addProductToCard } = useContext(CardContext);

    function getWishList() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });
    }

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["wishlist"],
        queryFn: getWishList,
        gcTime: 300000,
        refetchInterval: 1000
    });

    async function removeWishList(prodectId) {
        let { data } = await axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${prodectId}`,
            { headers }
        );
        // console.log(data);
        getWishList()
        // refetch()
    }


    return (<>{
        isLoading ?
            <Loading />
            :
            <>
                <div className="grid grid-cols-8 text-center md:text-start gap-4 px-9 mt-16 container mx-auto bg-[#f7f9fa] ">
                    {
                        data?.data.data.map((Prodect, index) =>
                            <div className="col-span-8 grid grid-cols-8 ">
                                
                                <div key={index} className="md:col-span-1 flex justify-center items-center col-span-8 mb-3 ">
                                    <img src={Prodect?.imageCover} className="w-full " alt={Prodect?.title} />
                                </div>
                                
                                <div className=" md:col-span-6 space-y-1 col-span-8 md:ps-5 md:border-b-2  md:border-dashed border-[#dfe2e6] md:pb-3 flex-col flex justify-center">
                                    <h2 className="text-[18px] font-[500]  text-[#212529]">{Prodect?.title}</h2>
                                    <h3 className="text-[14px] font-[500] text-[#198754] mb-">{Prodect?.price}EGP</h3>
                                    <h2 onClick={() => removeWishList(Prodect?.id)} className=" text-[12px] font-semibold  px-4 py-3 w-full md:w-fit border border-[#dc3545] rounded-lg bg-[#dc3545] hover:text-[#dc3545] duration-300 hover:bg-black">
                                        <i class="fa-solid fa-trash-can "></i> Remove
                                    </h2>
                                </div>
                                
                                <div className="md:col-span-1 sm:col-span-8 col-span-8 md:w-fit border-b-2 border-dashed md:border-none border-[#dfe2e6] -mt-3 md:ms-auto flex-col flex justify-center ">
                                    <button onClick={() => addProductToCard(Prodect?.id)} className="mt-5  py-2 text-lg">+ Add To Cart</button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </>}
    </>

    );
}
