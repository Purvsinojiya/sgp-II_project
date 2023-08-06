import React, { useState } from 'react';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Mr40CSGOCO7N9QbWHuiSH230rivS6toAxku1IphldfrfPjSaO3eWfsvPmw3fLfUj0RYB83bqepZTCSwZW2YwLrJ003EcQgrU3'); // Replace with your actual Stripe public key


function Payment() {
  const [paymentError, setPaymentError] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

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
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
      {paymentError && <div>{paymentError}</div>}
      {paymentComplete && <div>Payment completed successfully!</div>}
    </div>
  );
};

export default function PaymentWithStripe() {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
}
