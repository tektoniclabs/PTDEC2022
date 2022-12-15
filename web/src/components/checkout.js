import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#000',
  padding: '12px 60px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: 'rgb(255, 178, 56)',
  borderRadius: '6px',
  letterSpacing: '1.5px',
}

const buttonDisabledStyles = {
  opacity: '0.5',
  cursor: 'not-allowed',
}

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51HRWIRC7RjZGUeiq0tYCKI695Im3v1EV8MWGtsCms9CS9uwkOBvS8aBJtmmH9XpJsFCZhFNWEvg5YTtb5kVcmBOt00qU2wLqZ7'
    )
  }
  return stripePromise
}

const Checkout = () => {
  const [loading, setLoading] = useState(false)

  const redirectToCheckout = async (event) => {
    event.preventDefault()
    setLoading(true)

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      mode: 'subscription',
      lineItems: [{ price: 'price_1HTfwlC7RjZGUeiqf34pysyX', quantity: 1 }],
      successUrl: `http://localhost:8000/`,
      cancelUrl: `http://localhost:8000/`,
    })

    if (error) {
      console.warn('Error:', error)
      setLoading(false)
    }
  }

  return (
    <button
      disabled={loading}
      style={loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles}
      onClick={redirectToCheckout}
    >
      Subscribe to Pro Plan
    </button>
  )
}

export default Checkout
