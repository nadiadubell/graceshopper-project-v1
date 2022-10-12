import { useEffect, useState } from 'react';
const { axios } = require('axios');
const { BASE } = require('../api/index');

export const Orders = () => {
  const [userOrder, setUserOrder] = useState([]);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrder = async () => {
      const results = await openOrder();
      setUserOrder([results]);
    };
    fetchOrder();
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

  const handleRemoveButtonClick = async (orderId, productId) => {
    const response = await fetch(
      `${BASE}/orderproducts/${userId}/${orderId}/${productId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  };

  return (
    <div>
      {userOrder.map((order, i) => {
        return (
          <div id="order-page">
            <div key={i} id="order-products">
              {order.products.map((product, i) => {
                return (
                  <div key={i}>
                    <img src={product.image} />
                    <h4>{product.name}</h4>
                    <ul>
                      <li>Price: {product.price}</li>
                      <span>
                        <li>Quantity:</li>
                        <select required>
                          <option value="quantity">{product.quantity}</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                          <option value={9}>9</option>
                          {/* need to figure out how to make an input field that allows you
                        to manually enter a number larger than 10 if the below is selected */}
                          <option value={10}>10+</option>
                        </select>
                      </span>
                      <br></br>
                      <button
                        onClick={async event => {
                          event.preventDefault();
                          handleRemoveButtonClick(order.id, product.id);
                        }}
                      >
                        Remove From Cart
                      </button>
                    </ul>
                  </div>
                );
              })}
            </div>
            <div id="order-summary"></div>
          </div>
        );
      })}
    </div>
  );
};
