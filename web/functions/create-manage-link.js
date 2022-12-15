const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { faunaFetch } = require('./utils/fauna')

exports.handler = async (_event, context) => {
  const { user } = context.clientContext
  console.log(user)
  const result = await faunaFetch({
    query: `
      query ($netlifyID: ID!) {
        getUserByNetlifyID(netlifyID: $netlifyID) {
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user.sub,
    },
  })

  const { stripeID } = result.data.getUserByNetlifyID

  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   line_items: [
  //     {
  //       // Replace `price_...` with the actual price ID for your subscription
  //       // you created in step 2 of this guide.
  //       price: 'price_1HUipDC7RjZGUeiqesWDXmJv',
  //       quantity: 1,
  //     },
  //   ],
  //   mode: 'subscription',
  //   success_url: 'https://example.com/success',
  //   cancel_url: 'https://example.com/cancel',
  // })
  // console.log(session)
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(session.id),
  // }

  const link = await stripe.billingPortal.sessions.create({
    customer: stripeID,
    return_url: _event.body ? _event.body : process.env.URL,
  })

  return {
    statusCode: 200,
    body: JSON.stringify(link.url),
  }
}
