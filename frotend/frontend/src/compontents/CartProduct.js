import React from "react";
import img1 from './banner.jpg';
import img2 from './sopari.jpeg';

function CartProduct () {
    return (
        <div>
            <div className="w-[1100px] h-[121px] left-[170px] top-[428px] absolute bg-orange-400 rounded-[20px]" />
            <div className="w-[1100px] h-[121px] left-[170px] top-[285px] absolute bg-orange-400 rounded-[20px]" />
            <div className="left-[415px] top-[304px] absolute text-black text-[37px] font-light font-['Inter'] leading-10">
                Product 1
            </div>
            <img className="w-[137px] h-[91px] left-[217px] top-[300px] absolute rounded-[10px]" src={img1} />
            <div className="w-[219px] h-[50px] left-[415px] top-[349px] absolute">
                <span className="text-black text-[29px] font-light font-['Inter'] leading-10">
                    Rs. 650
                </span>
                <span className="text-black text-[35px] font-light font-['Inter'] leading-10"> </span>
                <span className="text-black text-xl font-light font-['Inter'] leading-10">
                    (per kg)
                </span>
            </div>
            <div className="left-[884px] top-[324px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">
                5
            </div>
            <div className="w-11 h-[47px] left-[823px] top-[320px] absolute bg-zinc-300 rounded-full" />
            <div className="w-11 h-[47px] left-[916px] top-[320px] absolute bg-zinc-300 rounded-full" />
            <div >
                <button className="left-[837px] top-[323px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">+</button>
                <button className="left-[932px] top-[323px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">-</button>
            </div>
            <div className="left-[1088px] top-[329px] absolute text-black text-3xl font-light font-['Inter'] leading-10">
                Rs. 3250
            </div>
            
            <div className="left-[415px] top-[449px] absolute text-black text-[37px] font-light font-['Inter'] leading-10">
                Product 2
            </div>
            <div className="left-[415px] top-[494px] absolute">
                <span className="text-black text-[29px] font-light font-['Inter'] leading-10">
                    RS. 500
                </span>
                <span className="text-black text-[37px] font-light font-['Inter'] leading-10"> </span>
                <span className="text-black text-xl font-light font-['Inter'] leading-10">
                    (per kg)
                </span>
            </div>
            <div className="w-11 h-[47px] left-[824px] top-[465px] absolute bg-zinc-300 rounded-full" />
            <div className="w-11 h-[47px] left-[916px] top-[465px] absolute bg-zinc-300 rounded-full" />
            <div className="left-[932px] top-[468px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">
                -
            </div>
            <div className="left-[884px] top-[468px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">
                2
            </div>
            <div className="left-[838px] top-[468px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">
                +
            </div>
            <div className="left-[1088px] top-[472px] absolute text-black text-3xl font-light font-['Inter'] leading-10">
                Rs. 1000
            </div>
            <div className="w-[719.03px] h-[0px] left-[550.99px] top-[587px] absolute border border-black"></div>
            <div className="left-[879px] top-[599px] absolute text-black text-3xl font-light font-['Inter'] leading-10">
                Total Cost :
            </div>
            <div className="left-[1088px] top-[599px] absolute text-black text-3xl font-light font-['Inter'] leading-10">
                Rs. 4250
            </div>
            
            
            <img className="w-[135px] h-[91px] left-[218px] top-[444px] absolute rounded-[10px]" src={img2} />
        </div>
    );
}

export default CartProduct;