import React, { useState } from 'react';
import axios from 'axios';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_51Mr40CSGOCO7N9QbWHuiSH230rivS6toAxku1IphldfrfPjSaO3eWfsvPmw3fLfUj0RYB83bqepZTCSwZW2YwLrJ003EcQgrU3');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    function getCookie(cookieName) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(cookieName + '=')) {
          return decodeURIComponent(cookie.substring(cookieName.length + 1));
        }
      }
      return null;
    }

    const Price = getCookie('Price');

    try {
      const { data } = await axios.post('https://shivams.onrender.com/apoo/payment', {
        description: 'Software development services',
        shipping: {
          name: formData.name,
          address: {
            line1: '510 Townsend St',
            postal_code: '98140',
            city: 'Anand',
            state: 'Gujarat',
            country: 'IN',
          },
        },
        amount: Price * 100,
        currency: 'inr',
        payment_method_types: ['card'],
      });
      const recipient = 'poorvsinojiya830@gmail.com'; // Replace with the recipient's email address
      const subject = 'NEW ORDER';
      const message = 'DISPATCHED';
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
          },
        },
      });

      if (result.error) {
        console.error(result.error.message);
        setPaymentError(result.error.message);
      } else {
        setPaymentComplete(true);

        fetch('https://shivams.onrender.com/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recipient, subject, message }),
        })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
        navigate('/');
      }
    } catch (error) {
      console.error('Axios error:', error);
      setPaymentError('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-blue-400 bg-orange-200 flex items-center justify-center px-5 pb-10 pt-16">
      <div className="h-[20rem] w-[24rem] mx-auto rounded-lg bg-orange-100 shadow-lg p-5 text-gray-700">
        <div className="bg-orange-300 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
          <i className="mdi mdi-credit-card-outline text-3xl"></i>
        </div>
        <div className="mb-10">
          <h1 className="text-center font-bold text-xl uppercase">
            Secure payment info
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="font-bold text-sm mb-2 ml-1">Card Number</label>
            <div className="mt-6"></div>
            <div>
              <CardElement
                options={{
                  iconStyle: "solid",
                  hidePostalCode: true,
                }}
                name="cardInfo"
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-orange-400 transition-colors"
              />
            </div>
          </div>
         
          <div className="mt-6"></div>

          {paymentComplete ? (
            <div className="text-green-600 text-center">
              Payment completed successfully!
            </div>
          ) : (
            <div>
              <button
                type="submit"
                className="block w-full max-w-xs mx-auto bg-orange-300 hover:bg-orange-400 focus:bg-orange-400 text-white rounded-lg px-3 py-3 font-semibold"
                disabled={!stripe || loading}
              >
                PAY NOW
              </button>
              {paymentError && <div className="text-red-600 text-center">{paymentError}</div>}
            </div>
          )}
        </form>
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
