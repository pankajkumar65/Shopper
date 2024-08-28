import React, { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) {
      setResponseMessage('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/subscription/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result) {
        setResponseMessage('Subscription successful!');
      } else {
        setResponseMessage('You are already subscribed.');
      }
    } catch (error) {
      setResponseMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className='newsletter'>
      <h1>Get Exclusive Offers on Your Email</h1>
      <p>Subscribe to our Newsletter and stay updated</p>
      <div>
        <input
          type='email'
          placeholder='Your email id'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubscribe}>Subscribe</button>
      </div>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Newsletter;
