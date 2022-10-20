import React, { useEffect, useState } from "react";
import { getUserProfileInfo, getUserContactInfo } from "../api";
import { Link } from 'react-router-dom';
import './Profile.css';


export const Profile = ({isLoggedIn, setProductId}) => {
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const currentToken = localStorage.getItem('token');
  const [userProfileInfo, setUserProfileInfo] = useState ([]);
  const [userOrderHistory, setUserOrderHistory] = useState([]);
  const [userContactInfo, setUserContactInfo] = useState({})

  
  useEffect(() => {
    getProfileInfo(userId)
    getUserContact(currentToken)
  }, []);
  
  
  const getProfileInfo = async (userId) => {
    const userInfo = await getUserProfileInfo(userId);
    setUserProfileInfo([userInfo]);
    setUserOrderHistory(userInfo.products);
  }

  const getUserContact = async(token) => {
    const userInfo = await getUserContactInfo(token);
    setUserContactInfo(userInfo);
  }
  
  
  return (
    <div id="profile-page">
    { userOrderHistory ? (
      <>
        <h1 id="user-profile-title">Welcome, {isLoggedIn.username}!</h1>
        <br/>
        <div id='user-profile-container'>
        <div id="user-info">
        <h2 id="user-info-title">User Info</h2>
        <span id="user-profile-info">
            {userProfileInfo.map((userProfile, i) => {
              return (
                <div id="user-result" key={i}>
                  <img id='user-profile-picture' src={userProfile.profilePicture}/>
                  <div id='user-details'>
                  <h4>First Name: {userProfile.firstName}</h4>
                  <br/>
                  <h4>Last Name: {userProfile.lastName}</h4>
                  <br/>
                  <h4>Email: {userProfile.email}</h4>
                  </div>
                </div>
              )
            })}
          </span>
          </div>
            <br/>
          <div id="user-order-history">
          <h2 id="order-history-title">Order History</h2>
          <span id='order-history'>
            {userOrderHistory.map((orderHistory, i) => {
              return (
                <div id='user-order-history' key={i}>
                  <h4>{orderHistory.name}</h4>
                  <br/>
                  <img id='order-history-img' src={orderHistory.image}/>
                  <br/><br/>
                  <p>Price: ${orderHistory.price}</p>
                  <br/>
                  <p>Quantity: {orderHistory.quantity}</p>
                  <br/>
                  <Link to="/:productId">
                  <button id="reorder-button" onClick={()=>{setProductId(orderHistory.id)}}>REORDER</button>
                  </Link>
                  </div>
                  )
                })}
                </span>
              </div>
              </div>
        </>
   ) : (
        <>
        <h1 id="user-profile-title">Welcome, {isLoggedIn.username}!</h1>
        <br/>
        <div id='user-profile-container'>
        <div id="user-info">
        <h2 id="user-info-title">User Info</h2>
        <span id="user-profile-info">
                <div id="user-result">
                  <img id='user-profile-picture' src={userContactInfo.profilePicture}/>
                  <div id='user-details'>
                  <h4>First Name: {userContactInfo.firstName}</h4>
                  <br/>
                  <h4>Last Name: {userContactInfo.lastName}</h4>
                  <br/>
                  <h4>Email: {userContactInfo.email}</h4>
                  </div>
                </div>
          </span>
          </div>
            <br/>
          <div id="user-order-history">
          <h2 id="order-history-title">Order History</h2>
              <div id="empty-order-history">
              <h2>Order History Unavailable</h2>
              </div>
          </div>
          </div>
        </>
    )}
    </div>
              )
}
