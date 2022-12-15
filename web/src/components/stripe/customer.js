import React, { useState } from 'react'

function CreateCustomerForm(props) {
  const [email, setEmail] = useState('')
  const [customer, setCustomer] = useState(null)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    return fetch('/create-customer', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => {
        return response.json()
      })
      .then((result) => {
        setCustomer(result.customer)
      })
  }

  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      <div>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          required
        />
      </div>

      <button id="email-submit" type="submit">
        <span id="button-text">Sign up</span>
      </button>
    </form>
  )
}

export default CreateCustomerForm
