import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserProfileInfo } from "../api";


export const Profile = (props) => {
  const userId = localStorage.getItem('userId');
  const [userProfileInfo, setUserProfileInfo] = useState ([]);
  

  useEffect(() => {
      getProfileInfo(userId)
  }, []);
  

  const getProfileInfo = async (userId) => {
        const userInfo = await getUserProfileInfo(userId);
        setUserProfileInfo([userInfo])
      }
  console.log("USERINFO:", userProfileInfo)
  
  // const reorderProduct = async () => {
  //   try {
      
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
        <h3>Hello {props.isLoggedIn.username}!</h3>
        <div id='user-profile-container'>
          <h4>Your Profile</h4>
            {userProfileInfo.map((userProfile, i) => {
              return (
                <div id='user-profile-info' key={i}>
                  <p>{userProfile.name}</p>
                </div>
              )
            })}
        </div>
    </>
  )
}
