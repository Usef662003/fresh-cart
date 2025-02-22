
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";

export default function Categories() {
  const [proId, setProId] = useState(null);
  const [title, setTitle] = useState(null);

  const getAllCategories = async () => {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllCategories"],
    queryFn: getAllCategories,
  });

  const getCategoriesDetels = async (id) => {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    return response.data;
  };

  const { data: categoryDetails, isLoading: detailsLoading, error: detailsError } = useQuery({
    queryKey: ["CategoriesDetels", proId],
    queryFn: () => getCategoriesDetels(proId),
    enabled: !!proId,
  });

  return (<>{isLoading ? <Loading /> :
    <div className="container mx-auto my-24">

      {isLoading && <Loading />}

      <div className="grid grid-cols-3 gap-4">
        {data?.data?.map((item) => (
          <div key={item._id} onClick={() => setProId(item._id)} className="cursor-pointer md:col-span-1 col-span-3 hover:shadow-slate-400  hover:scale-[1.025] duration-150 border rounded-md hover:shadow-lg transition">
            <img onClick={() => setTitle(item.name)} src={item?.image} className="w-full rounded-t-md h-[310px] object-cover object-center " alt={item?.name} />
            <h2 onClick={() => setTitle(item.name)} className="p-5 text-[22.5px] text-center text-[#198754] font-semibold">{item.name}</h2>
          </div>
        ))}
      </div>

      {proId && (
        <div className="mt-10">
          <h2 className="text-4xl text-center text-[#198754] font-semibold my-10">{title} subcategories</h2>
          {detailsLoading && <Loading />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {categoryDetails?.data?.map((subcategory) => (
              <div key={subcategory._id} className="bg-white p-2 shadow-md rounded-lg text-center hover:shadow-slate-400  hover:scale-105 duration-150 ">
                <h3 className="font-semibold text-2xl py-5 text-gray-700">{subcategory.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  }
  </>

  );
}