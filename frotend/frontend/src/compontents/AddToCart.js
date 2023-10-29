import React, { useState, useEffect } from "react";
import CartProduct from "./CartProduct";
import img1 from "./download.jpeg";
import img2 from "./download.jpeg";


function AddToCart() {
    const [products,SetProduct] = useState([]);

    useEffect(() => {
        function getCookie(cookieName) {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(cookieName + '=')) {
              return decodeURIComponent(cookie.substring(cookieName.length + 1));
            }
          }
          return null; // Cookie not found
        }
    
        const number = getCookie('number');
        console.log("the number: " + number); // Separate the text and number with a space
    
        // Fetch orders for the logged-in user
        fetch(`http://localhost:7000/apoo/addtocart/${number}`)
          .then((response) => response.json())
          .then((data) => {
            // Check if the 'data' property contains an array
            if (data.success && Array.isArray(data.data)) {
              SetProduct(data.data);
            } else {
              console.error('Data is not an array:', data);
            }
          })
          .catch((error) => console.error('Error fetching orders:', error));
      }, []);
    

    // const totalCartCost = products.reduce((total, product) => {
    //     return total + product.initialQuantity * parseFloat(product.pricePerKg.split(" ")[1]);
    // }, 0);

    return (
        <div className="w-screen h-screen relative bg-white">
            <div className="left-[61px] top-[85px] lg:left-[551px] lg:top-[164px] absolute text-black text-[40px] font-light font-['Inter'] leading-10">
                My Shopping Cart
            </div>
            {products.map((product, index) => (
                <CartProduct key={index} {...product} />
            ))}
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
            
            {/* <div className="w-[350px] h-[0px] left-[35px] top-[570px] lg:w-[719.03px] lg:h-[0px] lg:left-[550.99px] lg:top-[587px] absolute border border-black"></div>
            <div className="left-[56px] top-[600px] lg:left-[879px] lg:top-[599px] absolute text-black lg:text-3xl text-xl font-light font-['Inter'] leading-10">
                Total Cost: Rs. {totalCartCost}
            </div> */}
        </div>
    );
}

export default AddToCart;
