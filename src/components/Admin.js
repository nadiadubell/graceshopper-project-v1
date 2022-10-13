import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE } from '../api/index';

export const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await axios.get(`${BASE}/users`);
        console.log('users', data.data);
        setUsers(data.data);
        return data.data;
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();
  }, []);
  return (
    <div id="admin-dashboard">
      <h1 id="admin-header">Welcome Admin!</h1>
      <h2 id="admin-dashboard-header">Dashboard</h2>
    </div>
  );
};
