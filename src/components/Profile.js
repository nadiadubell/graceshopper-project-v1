const Profile = () => {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/');
    setUsername("");
    setPassword("");    
  }

  return (
    <>
    <h3><Link to="login" onClick={logout}>logout</Link></h3>
    </>
  )
}
