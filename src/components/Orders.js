import { useEffect, useState } from 'react';
const { axios } = require('axios');
const { BASE } = require('../api/index');

export const Orders = () => {
  const [userOrder, setUserOrder] = useState([]);
  const userId = 1;

  useEffect(() => {
    const fetchOrder = async () => {
      const results = await openOrder();
      setUserOrder([results]);
    };
    fetchOrder();
  }, []);

  console.log(userOrder);

  const openOrder = async () => {
    const response = await fetch(`${BASE}/orders/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
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
                    <div class="quantity-wrapper">
                      <li>Quantity:</li>
                      <span class="plus">+</span>
                      <span class="num">{product.quantity}</span>
                      <span class="minus">-</span>
                    </div>
                    <br></br>
                    <button>Remove From Cart</button>
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
