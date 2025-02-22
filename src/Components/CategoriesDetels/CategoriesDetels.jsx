import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

export default function CategoriesDetels() {

    const getCategoriesDetels = async (pordectId) => {
        const response = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/categories/6439d58a0049ad0b52b9003f`
            // `https://ecommerce.routemisr.com/api/v1/categories/${pordectId}`
        );
        return response.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ["CategoriesDetels"],
        queryFn: getCategoriesDetels,
    });
    console.log("data", data);

    return (
        <div>CategoriesDetels</div>
    )
}
