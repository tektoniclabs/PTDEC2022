import { loadStripe } from '@stripe/stripe-js'

let stripePromise
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      'pk_test_51HRWIRC7RjZGUeiq0tYCKI695Im3v1EV8MWGtsCms9CS9uwkOBvS8aBJtmmH9XpJsFCZhFNWEvg5YTtb5kVcmBOt00qU2wLqZ7'
    )
  }
  return stripePromise
}
