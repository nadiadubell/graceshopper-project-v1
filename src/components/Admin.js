import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE } from '../api/index';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getUsers = async token => {
      try {
        const data = await axios.get(`${BASE}/users`, {
          Authorization: `Bearer ${token}`,
        });
        console.log('users', data.data);
        setUsers(data.data);
        return data.data;
      } catch (err) {
        console.error(err);
      }
    };

    getUsers(token);
  }, []);
  return (
    <div id="admin-dashboard">
      <h1 id="admin-header">Welcome Admin!</h1>
      <h2 id="admin-dashboard-header">Dashboard</h2>
    </div>
  );
};
