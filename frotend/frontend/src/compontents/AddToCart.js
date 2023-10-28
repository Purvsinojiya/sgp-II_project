import React from "react";
import CartProduct from "./CartProduct";
function AddToCart() {
    return(
        <div className="w-screen h-screen relative bg-white">
            <div className="left-[61px] top-[85px] lg:left-[551px] lg:top-[164px] absolute text-black text-[40px] font-light font-['Inter'] leading-10">
                My Shopping Cart
            </div>
            <CartProduct />
            <div className="w-[124px] h-12 left-[270px] top-[597px] lg:w-[387px] lg:h-[61px] lg:left-[883px] lg:top-[675px] absolute bg-lime-300 lg:rounded-[20px] rounded-[10px]" />
            <div className="left-[285px] top-[599px] lg:left-[1005px] lg:top-[686px] absolute text-black lg:text-3xl text-2xl font-light font-['Inter'] leading-10">
                <button>
                    Buy Now
                </button>
            </div>
            <div className="left-[300px] top-[135px] lg:left-[1088px] lg:top-[231px] absolute text-black lg:text-[25px] text-[17px] font-light font-['Inter'] leading-10">
                <button>
                    Remove all
                </button>
            </div>

        </div>
    );
}

export default AddToCart;