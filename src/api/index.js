import axios from 'axios'

export const BASE = 'http://localhost:4000/api'

export const userCheck = async (token) => {
      const data = await axios.get(`${BASE}/users/me`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      if (data) {
          return data.data
      }
  }


export const getUserProfileInfo = async(userId) => {
    const userProfileInfoObj = await axios.get(`${BASE}/users/${userId}/profile`);
    const userProfileInfoArr = userProfileInfoObj.data
    return userProfileInfoArr;
}
