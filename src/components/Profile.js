import { useEffect, useState } from "react";
import { getUserProfileInfo } from "../api";


export const Profile = (props) => {
  const userId = localStorage.getItem('userId');
  const [userProfileInfo, setUserProfileInfo] = useState ([]);
  const [userOrderHistory, setUserOrderHistory] = useState([])
  

  useEffect(() => {
      getProfileInfo(userId)
  }, []);
  

  const getProfileInfo = async (userId) => {
        const userInfo = await getUserProfileInfo(userId);
        setUserProfileInfo([userInfo])
        setUserOrderHistory(userInfo.products)
      }
  
  // const reorderProduct = async () => {
  //   try {
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
        <h2>Hello {props.isLoggedIn.username}!</h2>
        <div id='user-profile-container'>
        <span>
          {/* <img id='user-image' src/> */}
          <div>User Profile Picture Here</div>
          <h3 id='user-info-title'>Your Profile Info</h3>
            {userProfileInfo.map((userProfile, i) => {
              return (
                <div id='user-info' key={i}>
                  <p>First Name: {userProfile.firstName}</p>
                  <p>Last Name: {userProfile.lastName}</p>
                  <p>Email: {userProfile.email}</p>
                </div>
              )
            })}
        </span>
            <br/>
          <h3 id='user-order-history-title'>Your Order History</h3>
            {userOrderHistory.map((orderHistory, i) => {
              return (
                <div id='user-order-history' key={i}>
                  <br/>
                  <h4>{orderHistory.name}</h4>
                  <p>Price: {orderHistory.price}</p>
                  <p>Quantity: {orderHistory.quantity}</p>
                  <br/>
                </div>
              )
            })}
        </div>
    </>
  )
}
