import React from "react";

function CartProduct(props) {
    const {image, product, quantity, totalAmount ,productPrice} = props;

    return (
        <div>
            <div className="w-[386px] h-[100px] left-[21px] top-[290px] lg:w-[1100px] lg:h-[121px] lg:left-[170px] lg:top-[285px] absolute bg-orange-400 rounded-[20px]" />
            <div className="left-[130px] top-[190px] lg:left-[415px] lg:top-[304px] absolute text-black lg:text-[37px] text-[27px] font-light font-['Inter'] leading-10">
                {product}
            </div>
            <img className="w-20 h-[58px] left-[38px] top-[202px] lg:w-[137px] lg:h-[91px] lg:left-[217px] lg:top-[300px] absolute rounded-[10px]" src={image} />
            <div className="left-[130px] top-[225px] lg:w-[219px] lg:h-[50px] lg:left-[415px] lg:top-[349px] absolute">
                <span className="text-black lg:text-[29px] text-[22px] font-light font-['Inter'] leading-10">
                    {productPrice}
                </span>
                <span className="text-black text-[35px] font-light font-['Inter'] leading-10"> </span>
                <span className="text-black lg:text-xl font-light font-['Inter'] leading-10">
                    (per kg)
                </span>
            </div>
            <div className="left-[330px] top-[210px] lg:left-[884px] lg:top-[324px] absolute text-black lg:text-[25px] text-[23px] font-light font-['Inter'] leading-10">
                {quantity}
            </div>
            <div className="w-[32px] h-[34px] left-[290px] top-[213px] lg:w-11 lg:h-[47px] lg:left-[823px] lg:top-[320px] absolute bg-zinc-300 rounded-full" />
            <div className="w-[32px] h-[34px] left-[350px] top-[213px] lg:w-11 lg:h-[47px] lg:left-[916px] lg:top-[320px] absolute bg-zinc-300 rounded-full" />
            <div >
                <button className="left-[300px] top-[211px] lg:left-[837px] lg:top-[323px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">+</button>
                <button className="left-[362px] top-[209px] lg:left-[932px] lg:top-[323px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">-</button>
            </div>
            <div className="hidden lg:block left-[1088px] top-[329px] absolute text-black text-3xl font-light font-['Inter'] leading-10">
                {totalAmount}
            </div>
        </div>
    );
}

export default CartProduct;
