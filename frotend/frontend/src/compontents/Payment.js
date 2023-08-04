import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Mr40CSGOCO7N9QbWHuiSH230rivS6toAxku1IphldfrfPjSaO3eWfsvPmw3fLfUj0RYB83bqepZTCSwZW2YwLrJ003EcQgrU3');

function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError('Payment gateway not available.');
      return;
    }

    setIsProcessing(true);

    try {
      // Create a payment method using the CardElement
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        setError(error.message);
        setIsProcessing(false);
        return;
      }

      // Send the payment method ID to your server for processing the payment
      const response = await fetch('http://localhost:7000/apoo/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      });

      if (!response.ok) {
        setError('Payment processing failed. Please try again.');
        setIsProcessing(false);
        return;
      }

      setIsPaymentSuccessful(true);
    } catch (error) {
      console.error('Payment error:', error);
      setError('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 border shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
      <form onSubmit={handlePaymentSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Card Details</label>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          className={`px-4 py-2 rounded-md ${
            isProcessing
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
          } text-white`}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {isPaymentSuccessful && (
        <div className="text-green-600 mt-4">Payment successful! Thank you for your purchase.</div>
      )}
    </div>
  );
}

export default function PaymentWithStripe() {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
}
