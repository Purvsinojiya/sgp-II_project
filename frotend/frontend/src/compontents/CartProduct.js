import React from "react";
import img1 from './banner.jpg';
import img2 from './banner.jpg';
function CartProduct () {
    return (
        <div>
            <div className="w-[386px] h-[100px] left-[21px] top-[180px] lg:w-[1100px] lg:h-[121px] lg:left-[170px] lg:top-[428px] absolute bg-orange-400 rounded-[20px]" />
            <div className="w-[386px] h-[100px] left-[21px] top-[290px] lg:w-[1100px] lg:h-[121px] lg:left-[170px] lg:top-[285px] absolute bg-orange-400 rounded-[20px]" />
            <div className="left-[130px] top-[190px] lg:left-[415px] lg:top-[304px] absolute text-black lg:text-[37px] text-[27px] font-light font-['Inter'] leading-10">
                Product 1
            </div>
            <img className="w-20 h-[58px] left-[38px] top-[202px] lg:w-[137px] lg:h-[91px] lg:left-[217px] lg:top-[300px] absolute rounded-[10px]" src={img1} />
            <div className="left-[130px] top-[225px] lg:w-[219px] lg:h-[50px] lg:left-[415px] lg:top-[349px] absolute">
                <span className="text-black lg:text-[29px] text-[22px] font-light font-['Inter'] leading-10">
                    Rs. 650
                </span>
                <span className="text-black text-[35px] font-light font-['Inter'] leading-10"> </span>
                <span className="text-black lg:text-xl font-light font-['Inter'] leading-10">
                    (per kg)
                </span>
            </div>
            <div className="left-[330px] top-[210px] lg:left-[884px] lg:top-[324px] absolute text-black lg:text-[25px] text-[23px] font-light font-['Inter'] leading-10">
                5
            </div>
            <div className="w-[32px] h-[34px] left-[290px] top-[213px] lg:w-11 lg:h-[47px] lg:left-[823px] lg:top-[320px] absolute bg-zinc-300 rounded-full" />
            <div className="w-[32px] h-[34px] left-[350px] top-[213px] lg:w-11 lg:h-[47px] lg:left-[916px] lg:top-[320px] absolute bg-zinc-300 rounded-full" />
            <div >
                <button className="left-[300px] top-[211px] lg:left-[837px] lg:top-[323px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">+</button>
                <button className="left-[362px] top-[209px] lg:left-[932px] lg:top-[323px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">-</button>
            </div>
            <div className="hidden lg:block left-[1088px] top-[329px] absolute text-black text-3xl font-light font-['Inter'] leading-10">
                Rs. 3250
            </div>
            
            <div className="left-[130px] top-[300px] lg:left-[415px] lg:top-[449px] absolute text-black lg:text-[37px] text-[27px] font-light font-['Inter'] leading-10">
                Product 2
            </div>
            <div className="left-[130px] top-[335px] lg:left-[415px] lg:top-[494px] absolute">
                <span className="text-black lg:text-[29px] text-[22px] font-light font-['Inter'] leading-10">
                    RS. 500
                </span>
                <span className="text-black text-[37px] font-light font-['Inter'] leading-10"> </span>
                <span className="text-black lg:text-xl font-light font-['Inter'] leading-10">
                    (per kg)
                </span>
            </div>
            <div className="w-[32px] h-[34px] left-[290px] top-[320px] lg:w-11 lg:h-[47px] lg:left-[824px] lg:top-[465px] absolute bg-zinc-300 rounded-full" />
            <div className="w-[32px] h-[34px] left-[350px] top-[320px] lg:w-11 lg:h-[47px] lg:left-[916px] lg:top-[465px] absolute bg-zinc-300 rounded-full" />
            <div className="left-[362px] top-[316px] lg:left-[932px] lg:top-[468px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">
                -
            </div>
            <div className="left-[330px] top-[316px] lg:left-[884px] lg:top-[468px] absolute text-black lg:text-[25px] text-[23px] font-light font-['Inter'] leading-10">
                2
            </div>
            <div className="left-[300px] top-[318px] lg:left-[838px] lg:top-[468px] absolute text-black text-[25px] font-light font-['Inter'] leading-10">
                +
            </div>
            <div className="hidden lg:block left-[1088px] top-[472px] absolute text-black text-3xl font-light font-['Inter'] leading-10">
                Rs. 1000
            </div>
            <div className="w-[350px] h-[0px] left-[35px] top-[570px] lg:w-[719.03px] lg:h-[0px] lg:left-[550.99px] lg:top-[587px] absolute border border-black"></div>
            <div className="left-[56px] top-[600px] lg:left-[879px] lg:top-[599px] absolute text-black lg:text-3xl text-xl font-light font-['Inter'] leading-10">
                Total Cost :
            </div>
            <div className="left-[158px] top-[600px] lg:left-[1088px] lg:top-[599px] absolute text-black lg:text-3xl text-xl font-light font-['Inter'] leading-10">
                Rs. 4250
            </div>
            
            
            <img className="w-20 h-[58px] left-[38px] top-[312px] lg:w-[135px] lg:h-[91px] lg:left-[218px] lg:top-[444px] absolute rounded-[10px]" src={img2} />
        </div>
    );
}

export default CartProduct;