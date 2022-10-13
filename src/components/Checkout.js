import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const { BASE } = require('../api/index');

export const Checkout = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [CVC, setCVC] = useState('');
  const [orderId, setOrderId] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const getOrderId = async () => {
      const results = await openOrder();
      setOrderId(results.id);
    };
    getOrderId();
  }, []);

  const openOrder = async () => {
    const response = await fetch(`${BASE}/orders/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const enterName = event => {
    setName(event.target.value);
  };

  const enterCardNumber = event => {
    setCardNumber(event.target.value);
  };

  const enterExpDate = event => {
    setExpDate(event.target.value);
  };

  const enterCVC = event => {
    setCVC(event.target.value);
  };

  const handleSubmit = async () => {
    const response = await fetch(`${BASE}/orders/${userId}/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        orderId,
        isOpen: false,
      }),
    });
    const data = await response.json();
    return data;
  };

  return (
    <div>
      <form
        id="checkout-form"
        onSubmit={async event => {
          event.preventDefault();
          await handleSubmit();
          navigate('/profile');
        }}
      >
        <input
          className="input-form"
          placeholder="Full name as it Appears on Credit Card"
          type="text"
          required
          value={name}
          onChange={enterName}
        ></input>
        <input
          className="input-form"
          placeholder="Credit Card Number"
          type="number"
          required
          value={cardNumber}
          onChange={enterCardNumber}
        ></input>
        <input
          className="input-form"
          placeholder="Exp. Month/Year"
          type="month"
          required
          value={expDate}
          onChange={enterExpDate}
        ></input>
        <input
          className="input-form"
          placeholder="CVC"
          type="number"
          required
          value={CVC}
          onChange={enterCVC}
        ></input>
        <button>Place Order</button>
      </form>
    </div>
  );
};
