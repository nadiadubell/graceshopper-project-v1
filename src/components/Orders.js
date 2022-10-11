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
    const data = response.json();
    console.log(data);
  };

  return (
    <div>
      {userOrder.map((order, i) => {
        return (
          <div key={i}>
            {order.products.map((product, i) => {
              return (
                <div key={i}>
                  {/* product image */}
                  <h4>{product.name}</h4>
                  <ul>
                    <li>Price: {product.price}</li>
                    <li>Quantity:{product.quantity}</li>
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
        );
      })}
    </div>
  );
};
