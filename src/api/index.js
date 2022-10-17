import axios from 'axios';

export const BASE =
  `${process.env.BASE}:${process.env.PORT}/api` || 'http://localhost:4000/api';

export const userCheck = async token => {
  const data = await axios.get(`/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    return data.data;
  }
};

export const getUserContactInfo = async token => {
  const data = await axios.get(`/api/users/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    return data.data;
  }
};

export const getUserProfileInfo = async userId => {
  const userProfileInfoObj = await axios.get(`/api/users/${userId}/profile`);
  const userProfileInfoArr = userProfileInfoObj.data;
  return userProfileInfoArr;
};
