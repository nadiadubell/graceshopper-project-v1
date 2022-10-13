import { useEffect, useState } from 'react';
import { BASE } from '../api/index';
import './Admin.css';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const getUsers = async token => {
      try {
        const response = await fetch(`${BASE}/users`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsers(data);
        return data;
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
      {users.map((user, id) => {
        return (
          <div id="users" key={id}>
            <h3 id="user-username">username: {user.username}</h3>
            <h3 id="user-isAdmin">isAdmin: {String(user.isAdmin)}</h3>
            <h3 id="user-firstname">firstname: {user.firstName}</h3>
            <h3 id="user-lastname">lastname: {user.lastName}</h3>
            <h3 id="user-email">email: {user.email}</h3>
          </div>
        );
      })}
    </div>
  );
};
