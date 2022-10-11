import { useEffect } from "react";


export const Profile = () => {
  const [info, setInfo] = useState ({});
  const [orderHistory, setOrderHistory] = useState ({});

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/');
    setUsername("");
    setPassword("");    
  }

  const getUserInfo = async () => {
    try {
      const result = await getUser()
      if(result){
          setInfo(result)
      }      
    } catch (error) {
      console.log(error)
    }
  }

  const getOrderHistoryInfo = async () => {
    try {
      if (info && info.id) {
        const orderHistoryResult = await getOrderHistoryById(info.id)
        if (orderHistoryResult) {
          setOrderHistory(orderHistoryResult)
        }
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
    <h3>Hello {info.username}!</h3>
    <h2>Order History</h2>
    <span onClick={reorder} >Re-Order! </span>
    <h4><Link to="login" onClick={logout}>logout</Link></h4>
    </>
  )
}
