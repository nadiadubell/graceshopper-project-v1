const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  setIsLoggedIn(false);
  navigate('/');
  setUsername("");
  setPassword("");  
}