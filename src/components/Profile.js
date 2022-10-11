import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Profile = (props) => {
  const [orderHistory, setOrderHistory] = useState ({});

  useEffect(() => {
    getOrderHistoryInfo()
  }, []);

  let navigate = useNavigate();

  const getOrderHistoryInfo = async (id) => {
    try {
      const orderHistoryResult = await getOrderHistoryById(id)
      if (orderHistoryResult) {
        setOrderHistory(orderHistoryResult)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const reorderProduct = async () => {
  //   try {
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    props.setIsLoggedIn(false);
    navigate('/');  
  }

  return (
    <>
    <h3>Hello {props.isLoggedIn.username}!</h3>
    <h2>Order History</h2>
    <button onClick={reorder}>Re-Order!</button>
    <h4><Link to="login" onClick={logout}>logout</Link></h4>
    </>
  )
}
