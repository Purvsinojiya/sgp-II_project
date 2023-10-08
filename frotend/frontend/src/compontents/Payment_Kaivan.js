import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51Mr40CSGOCO7N9QbWHuiSH230rivS6toAxku1IphldfrfPjSaO3eWfsvPmw3fLfUj0RYB83bqepZTCSwZW2YwLrJ003EcQgrU3'); // Replace with your actual Stripe public key

const PaymentForm = () => {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    securityCode: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe.js hasn't loaded yet.");
      return;
    }

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentComplete(false);
    } else {
      // Send the paymentMethod.id to your server to complete the payment
      try {
        const response = await fetch('http://localhost:7000/apoo/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        });

        if (response.ok) {
          setPaymentError(null);
          setPaymentComplete(true);
        } else {
          setPaymentError('Error processing payment. Please try again.');
          setPaymentComplete(false);
        }
      } catch (err) {
        console.error('Error making the payment request:', err);

        setPaymentError('An error occurred while processing the payment. Please try again.');
        setPaymentComplete(false);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-400 bg-orange-200 flex items-center justify-center px-5 pb-10 pt-16">
      <div className="w-600 mx-auto rounded-lg bg-orange-100 shadow-lg p-5 text-gray-700">
        <div className="bg-orange-300 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
          <i className="mdi mdi-credit-card-outline text-3xl"></i>
        </div>
        <div className="mb-10">
          <h1 className="text-center font-bold text-xl uppercase">
            Secure payment info
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
        <CardElement />
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
            <div>
              <input
                placeholder="John Smith"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-orange-400 transition-colors"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Card number</label>
            <div>
              <input
                placeholder="0000 0000 0000 0000"
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-orange-400 transition-colors"
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">
              Expiration date (MM/YYYY)
            </label>
            <div className="flex">
              <div className="mr-2">
                <input
                  placeholder="MM"
                  type="text"
                  name="expirationMonth"
                  value={formData.expirationMonth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-orange-400 transition-colors"
                />
              </div>
              <div>
                <input
                  placeholder="YYYY"
                  type="text"
                  name="expirationYear"
                  value={formData.expirationYear}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-orange-400 transition-colors"
                />
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Security code</label>
            <div>
              <input
                placeholder="000"
                type="text"
                name="securityCode"
                value={formData.securityCode}
                onChange={handleInputChange}
                className="w-100 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-orange-400 transition-colors"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="block w-full max-w-xs mx-auto bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-white rounded-lg px-3 py-3 font-semibold"
              isabled={!stripe}
            >
              PAY NOW
            </button>
          </div>
        </form>
        {paymentError && <div>{paymentError}</div>}
      {paymentComplete && <div>Payment completed successfully!</div>}
      </div>
    </div>
  );
};

export default function PaymentWithStripe() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}