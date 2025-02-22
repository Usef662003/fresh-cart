import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { CardContext } from '../CardContext/CardContext';
import Loading from '../Loading/Loading';
import { Input } from '@heroui/react';

export default function Prodect() {
    const [searchTerm, setSearchTerm] = useState("");
    const token = localStorage.getItem("token");
    const headers = token ? { token } : {};
    const { addProductToCard } = useContext(CardContext);

    const { data: wishlistData, refetch } = useQuery({
        queryKey: ["allWishList"],
        queryFn: async () => {
            const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });
            return response.data.data;
        },
        enabled: !!token,
    });

    const { mutate: addToWishlist } = useMutation({
        mutationFn: async (productId) => {
            const response = await axios.post(
                "https://ecommerce.routemisr.com/api/v1/wishlist",
                { productId },
                { headers }
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Added to Wish List", {
                duration: 2000,
                position: 'right-top',
                removeDelay: 500,
                iconTheme: {
                    primary: '#10ad10',
                    secondary: '#000',
                }
            })
            refetch();
        },
    });

    const isProductInWishlist = (productId) => {
        return wishlistData?.some((item) => item._id === productId);
    };

    function getAllProdect() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products");
    };

    const { data, isLoading } = useQuery({
        queryKey: ["recentProdect"],
        queryFn: getAllProdect,
        gcTime: 300000,
        refetchInterval: 1000
    });

    const filteredProducts = data?.data?.data?.filter((prodect) =>
        prodect?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    if (isLoading) return <Loading />;

    return (
        <>
            <div className="mx-auto container flex justify-center items-center pt-10">
                <Input
                    type="search"
                    label="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </div>

            <div className="grid grid-cols-6 container gap-4 my-20">
                {filteredProducts?.length > 0 ? (
                    filteredProducts.map((prodect, index) => (
                        <div key={index} className="col-span-6 sm:col-span-3 md:col-span-2 lg:col-span-1">
                            <div className="product p-3 rounded-2xl">
                                <Link to={`/prodectdetals/${prodect?.id}`}>
                                    <img src={prodect.imageCover} className="w-full rounded-md object-cover" alt={prodect.title} />
                                    <h3 className="text-[#10ad10]">{prodect.category.name}</h3>
                                    <h2 className="text-xl line-clamp-1">{prodect.title}</h2>
                                    <div className="flex justify-between">
                                        <h3>{prodect.price} EGP</h3>
                                        <h3><i className="fa-solid fa-star text-yellow-400"> {prodect.ratingsAverage}</i></h3>
                                    </div>
                                </Link>
                                <div className="flex">
                                    <button onClick={() => addProductToCard(prodect?.id)} className="btn w-[80%]">
                                        Add to Cart
                                    </button>
                                    <span onClick={() => addToWishlist(prodect.id)} className="cursor-pointer">
                                        <i
                                            className={`fa-solid fa-heart text-2xl ms-2.5 mt-2.5 w-[20%] duration-300 ${isProductInWishlist(prodect.id) ? "text-red-600" : "hover:text-red-600"
                                                }`}
                                        ></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="col-span-6 text-center text-lg text-gray-500">No products found.</p> 
                )}
            </div>
        </>
    );
}
