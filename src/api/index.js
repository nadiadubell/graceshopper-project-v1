import axios from 'axios';

// export const BASE = process.env.BASE
//   ? `${process.env.BASE}:${process.env.PORT}/api`
//   : 'http://localhost:4000/api';

export const BASE = '/api';
//   process.env.NODE_ENV === 'production'
//     ? `https://horseplay.herokuapp.com:443/api`
//     : 'http://localhost:4000/api';

// console.log('BASE>>>>>>>>>>>>>>>>>>>', BASE);

export const userCheck = async token => {
  const response = await fetch(`${BASE}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data) {
    return data;
  }
};

export const getUserContactInfo = async token => {
  const response = await fetch(`${BASE}/users/info`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data) {
    return data;
  }
};

export const getUserProfileInfo = async userId => {
  const userProfileInfoObj = await axios.get(`${BASE}/users/${userId}/profile`);
  const userProfileInfoArr = userProfileInfoObj.data;
  if (userProfileInfoArr) {
    return userProfileInfoArr;
  }
};
