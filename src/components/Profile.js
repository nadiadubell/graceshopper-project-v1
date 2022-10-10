import { useEffect } from "react";

const Profile = () => {
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
  useEffect(() => {
    getUserInfo()
  }, []);

  return (
    <>
    <h3>Hello {info.username}!</h3>
    <h2>Order History</h2>
    <h4><Link to="login" onClick={logout}>logout</Link></h3>
    </>
  )
}
