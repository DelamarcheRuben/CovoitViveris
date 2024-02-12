import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const UserProvider = ({ children, navigate }) => {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    document.cookie = "user_id="+newUser.uid + ";Secure;max-age=86400";
    setUser(newUser);
  };

  const logout = () => {
    document.cookie = "user_id=0;max-age=0";
    navigate('/login');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  if(context.user===null)
  {
    var user_id = getCookie("user_id")
    if(user_id)
    {
      fetch("http://localhost:8080/user/"+user_id)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        context.updateUser(data);
      });
    }
  }

  return context;
};
