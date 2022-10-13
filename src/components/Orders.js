import { useEffect, useState } from 'react';
const { axios } = require('axios');
const { BASE } = require('../api/index');

export const Orders = () => {
  const [userOrder, setUserOrder] = useState([]);
  const [total, setTotal] = useState('');
  const [renderer, setRenderer] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrder = async () => {
      const results = await openOrder();
      setUserOrder([results]);
      getTotal(results);
    };
    fetchOrder();
  }, [renderer]);

  const openOrder = async () => {
    const response = await fetch(`${BASE}/orders/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  const getOrderProduct = async (orderId, productId) => {
    const response = await fetch(
      `${BASE}/orderproducts/${userId}/${orderId}/${productId}`
    );
    const data = await response.json();
    return data.id;
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
    setRenderer(!renderer);
    return data;
  };

  const handleQuantityChange = async (i, orderId, productId) => {
    const orderProductId = await getOrderProduct(orderId, productId);
    const select = document.getElementById(`quantity-select-${i}`);
    const value = select.options[select.selectedIndex].value;
    const response = await fetch(`${BASE}/orderproducts/${orderProductId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        quantity: `${value}`,
      }),
    });
    const data = await response.json();
    setRenderer(!renderer);
    return data;
  };

  const getTotal = order => {
    let totalPrice = 0;
    let products = order.products;
    for (const product of products) {
      totalPrice += product.price * product.quantity;
    }
    setTotal(totalPrice);
  };

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
                          id={`quantity-select-${i}`}
                          required
                          onChange={event => {
                            event.preventDefault();
                            handleQuantityChange(i, order.id, product.id);
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
