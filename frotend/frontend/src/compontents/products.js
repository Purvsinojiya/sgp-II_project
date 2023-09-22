import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { cartState, dispatch } = useCart();

  useEffect(() => {
    // Fetch the product data based on the ID from the backend server
    fetch(`http://localhost:7000/apoo/home/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error('Error fetching product:', error));
  }, [id]);

  useEffect(() => {
    // Check if the product is already in the cart and update quantity
    const cartItem = cartState.cartItems.find((item) => item.id === id);
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartState.cartItems, id]);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
  };

  const handleBuyNow = () => {
    setIsBuying(true);
    // Add logic to handle the purchase, e.g., redirect to a checkout page or show a modal
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const totalPrice = product.productPrice * quantity;

  return (
    <div className="w-[348px] h-[524px] left-[13px] top-[72px] lg:w-[1024.89px] lg:h-[547px] lg:left-[208px] lg:top-[107px] absolute">
    <div className="w-[348px] h-[524px] lg:w-[1024.89px] lg:h-[547px] left-0 top-0 absolute bg-[#fce8c9] rounded-[20px] shadow-xl" />
        <div className="w-[237px] h-[41px] lg:w-[245px] lg:h-[61.49px] px-7 py-[3px] left-[56px] top-[397px] lg:left-[609.08px] lg:top-[377.74px] absolute bg-[#fba557] hover:bg-[#fb8c24] rounded-[10px] justify-center items-center gap-4 inline-flex shadow-xl">
        <div className="text-center text-white text-3xl font-semibold font-sans leading-10 cursor-pointer ">
            Buy Now
        </div>

    </div>

    <div className="w-[237px] h-[41px] lg:w-[245px] lg:h-[61.49px] px-7 py-[3px] left-[56px] top-[460px] lg:left-[609.08px] lg:top-[459.74px] absolute bg-[#fba557] hover:bg-[#fb8c24] rounded-[10px] justify-center items-center gap-4 inline-flex shadow-xl">
        <div className="text-center text-white text-3xl font-semibold font-sans leading-10 cursor-pointer">
            Add to Cart
        </div>

    </div>
        <img className="w-[322px] h-[134.11px] left-[15px] top-[15.33px] lg:w-[326.01px] lg:h-[472.42px] lg:left-[42.95px] lg:top-[38.07px] absolute rounded-[20px]" src={product.imageUrl} />

        <div className="w-[223px] h-[46.94px] left-[21px] top-[247.15px] lg:w-[407.96px] lg:h-[48.74px] lg:left-[558.32px] lg:top-[75.16px] absolute text-[#464545] text-[40px] font-bold font-sans leading-[30px]">
            Product
        </div>

        <div className="w-[315px] h-[58.44px] left-[22px] top-[317.08px] lg:w-[408px] lg:h-[171.79px] lg:left-[558.32px] lg:top-[185.46px] absolute text-stone-500 text-[15px] font-medium font-sans leading-[30px]">
             
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et...
        </div>

        <img className="w-[86px] h-[76.64px] left-[21px] top-[158.06px] lg:w-[128.84px] lg:h-[100.54px] lg:left-[383.60px] lg:top-[104.44px] absolute rounded-[20px]" src={product.imageUrl}/>
        <img className="w-[98px] h-[76.64px] left-[121px] top-[158.06px] lg:w-[128.84px] lg:h-[100.54px] lg:left-[383.60px] lg:top-[223.52px] absolute rounded-[20px]" src={product.imageUrl} />
        <img className="w-[94px] h-[76.64px] left-[233px] top-[158.06px] lg:w-[128.84px] lg:h-[100.54px] lg:left-[383.60px] lg:top-[347.49px] absolute rounded-[20px]" src={product.imageUrl} />

        <div className="w-[95px] h-[29.70px] left-[21px] top-[287px] lg:w-[199.12px] lg:h-[31.23px] lg:left-[558.32px] lg:top-[133.72px] absolute text-black text-xl font-semibold font-sans leading-[30px]">
        Price: ${product.productPrice}
        </div>
        
</div>
  );
}

export default ProductDetail;
