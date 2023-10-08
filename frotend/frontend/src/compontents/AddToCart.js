import React from "react";
import CartProduct from "./CartProduct";
function AddToCart() {
    return(
        <div className="w-screen h-screen relative bg-white">
            <div className="left-[551px] top-[164px] absolute text-black text-[40px] font-light font-['Inter'] leading-10">
                My Shopping Cart
            </div>
            <CartProduct />
            <div className="w-[387px] h-[61px] left-[883px] top-[675px] absolute bg-lime-300 rounded-[20px]" />
            <div className="left-[1005px] top-[686px] absolute text-black text-3xl font-light font-['Inter'] leading-10">
                <button>
                    Buy Now
                </button>
            </div>
            <div className="left-[1088px] top-[231px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">
                <button>
                    Remove all
                </button>
            </div>

        </div>
    );
}

export default AddToCart;