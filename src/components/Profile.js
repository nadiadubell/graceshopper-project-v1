import { useEffect, useState } from "react";
import { getUserProfileInfo } from "../api";
import { Link } from 'react-router-dom';
import './Profile.css';


export const Profile = ({isLoggedIn, setProductId}) => {
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
  

  return (
    <div id="profile-page">
        <h1 id="user-profile-title">Welcome, {isLoggedIn.username}!</h1>
        <br/>
        <h2 id='user-info-title'>Profile Info</h2>
        <span id='user-profile-container'>
          <p id='user-profile-picture'>User Profile Picture Here</p>
          <div id="user-profile-info">
            {userProfileInfo.map((userProfile, i) => {
              return (
                <div id='user-info' key={i}>
                  <h4>First Name: {userProfile.firstName}</h4>
                  <br/>
                  <h4>Last Name: {userProfile.lastName}</h4>
                  <br/>
                  <h4>Email: {userProfile.email}</h4>
                </div>
              )
            })}
          </div>
        </span>
            <br/>
          <h2 id='user-order-history-title'>Order History</h2>
            <div id='user-order-history-container'>
            {userOrderHistory.map((orderHistory, i) => {
              return (
                <div id='user-order-history' key={i}>
                  <h4>{orderHistory.name}</h4>
                  <br/>
                  <img id='order-history-img' src={orderHistory.image}/>
                  <br/><br/>
                  <p>Price: {orderHistory.price}</p>
                  <br/>
                  <p>Quantity: {orderHistory.quantity}</p>
                  <br/>
                  <Link to="/:productId">
                  <button id="reorder-button" onClick={()=>{setProductId(orderHistory.id)}}>REORDER</button>
                  </Link>
                </div>
              )
            })}
            </div>
    </div>
  )
}
