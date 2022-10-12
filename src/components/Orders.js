import { useEffect, useState } from 'react';
const { axios } = require('axios');
const { BASE } = require('../api/index');

export const Orders = () => {
  const [userOrder, setUserOrder] = useState([]);
  const [total, setTotal] = useState('');
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrder = async () => {
      const results = await openOrder();
      setUserOrder([results]);
      getTotal(results);
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

  const handleQuantityChange = async (orderId, productId, orderProductId) => {
    const select = document.getElementById('quantity-select');
    const value = select.options[select.selectedIndex].value;
    const response = await fetch(`${BASE}/orderproducts/${orderProductId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        orderId,
        productId,
        quantity: `${value}`,
      }),
    });
    const data = await response.json();
    console.log('DATAAAAAAAAAAAAAAAAAAAAAA', data);
  };

  const getTotal = order => {
    let totalPrice = 0;
    let products = order.products;
    console.log(products);
    for (const product of products) {
      totalPrice += product.price * product.quantity;
      console.log('PRODUCT PRICE', product.price);
      console.log('TOTAL PRICE', totalPrice);
    }
    setTotal(totalPrice);
    console.log(total);
  };

  console.log('USER ORDER', userOrder);

  return (
    <div id="order-page">
      {userOrder.map((order, i) => {
        return (
          <div key={i}>
            <div id="order-products">
              {order.products.map((product, i) => {
                return (
                  <div key={i}>
                    <img src={product.image} />
                    <h4>{product.name}</h4>
                    <ul>
                      <li>Price: {product.price}</li>
                      <span>
                        <li>Quantity:</li>
                        <select
                          id="quantity-select"
                          required
                          onChange={() => {
                            handleQuantityChange(
                              order.id,
                              product.id,
                              order.orderProductId
                            );
                          }}
                        >
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
            <div id="order-summary">
              <h3>Order Summary</h3>
              <h5>Subtotal: ${total}</h5>
              <h5>Estimated Shipping & Handling:</h5>
              <h5>Estimated Tax: ${total * 0.1}</h5>
              <h3>Total:</h3>
              <button>Checkout</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
