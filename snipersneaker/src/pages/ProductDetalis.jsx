import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { client } from "../lib/client";
import { urlFor } from "../lib/client";
import { AiOutlineHeart } from "react-icons/ai";
import { sizes } from "../constants";

const ProductDetalis = () => {
  const { slug } = useParams();
  const FetchSlug = () => {
    const query = `*[_type == "product" && slug.current == '${slug}']`;

    const product = client.fetch(query);

    return product;
  };
  const { data } = useQuery({
    queryKey: ["products", slug],
    queryFn: () => FetchSlug(),
  });

  const newData = data[0];
  return (
    <div className="w-full h-full flex gap-5 flex-col my-10 ">
      <div className="container border-4 border-black flex">
        <div className="w-[50%] ">
          <img
            className="w-full h-full"
            src={`${urlFor(newData.image[0].asset._ref)}`}
            alt={newData.name}
          />
        </div>
        <div className="w-[50%] flex flex-col  items-center justify-center gap-8 ">
          <div className=" flex flex-col items-center  ">
            <h1 className="font-black text-center text-2xl md:text-4xl">
              {newData.name}
            </h1>
            <p variants={fadeItem} className="text-xl   md:text-3xl">
              {newData.price}$ div{" "}
            </p>
          </div>
          <div className=" flex w-full divms-center gap-2 justify-center">
            <button className="bg-black font-bold w-fit outline-none border-2 border-black p-2 text-white  hover:bg-transparent hover:text-black duration-300">
              Buy Now
            </button>
            <button className="bg-transparent font-bold w-fit outline-none border-2  border-black p-2 hover:bg-black hover:text-white duration-300">
              <AiOutlineHeart className="text-center" size={25} />
            </button>
          </div>
        </div>
      </div>
      <div className="container border-4 flex border-black my-10  ">
        <div className="flex flex-wrap gap-3 w-[60%]">
          {newData?.image.map((img, i) => (
            <img
              key={i}
              className="w-[450px]"
              src={`${urlFor(img.asset._ref)}`}
              alt=""
            />
          ))}
        </div>
        <div className="w-[40%] flex text-center items-start p-2 justify-center">
          <div className="w-full h-[250px] border-4 flex items-center flex-col gap-2 justify-center border-black mt-2">
            <img
              className="w-[50px] object-cover"
              src={`${urlFor(newData.logo.asset._ref)}`}
            />
            <p>{newData.slug.current}</p>
            <p>Color Black</p>
            <p>{newData.price}$</p>
            <div className="flex gap-2 items-center">
              {sizes.map((s, i) => (
                <p className="" key={i}>
                  {s}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetalis;
