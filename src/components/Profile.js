import { useEffect, useState } from "react";
// import { getOrderHistoryById } from "../../db";


export const Profile = (props) => {
  const [orderHistory, setOrderHistory] = useState ({});

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/');
    setUsername("");
    setPassword("");    
  }


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

  const reorderProduct = async () => {
    try {
      
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getUserInfo()
  }, []);

  useEffect(() => {
    getOrderHistoryInfo()
  }, [info]);


  return (
    <>
    <h3>Hello {props.isLoggedIn.username}!</h3>
    <h2>Order History</h2>
    <span onClick={reorder} >Re-Order! </span>
    <h4><Link to="login" onClick={logout}>logout</Link></h4>
    </>
  )
}
