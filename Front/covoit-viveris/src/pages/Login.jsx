import React from "react";
// import { useState } from "react";
import Authentification from "../components/authentification/Authentification";
import Home from "./Home";
import { UserProvider, useUser } from "../context/UserContext";
import { useNavigate  } from "react-router-dom";

const Login = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    fetch("http://localhost:8080/users?pseudo="+username)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        updateUser(data[0]);
        navigate('/home');
      });
    /*if (password === 'admin') {
      updateUser({ id: 1, pseudo: username, job: "Dev Full-Stack", city: "Boulogne-Billancourt", nb_carshares: 549, kilometers: 8754, experience: 109, picture_background: "mountain", nb_badges: 39, start_date: "16/07/2021" });
      navigate('/home');
    } 
    else if (password === 'secret') {
      updateUser({ id: 2, pseudo: username, job: "Dev Full-Stack", city: "Boulogne-Billancourt", nb_carshares: 549, kilometers: 8754, experience: 109, picture_background: "mountain", nb_badges: 39, start_date: "16/07/2021" });
      navigate('/home');
    }
    else {
      alert('Mot de passe incorrect');
    }*/
  };

  return (
    <div>
        <Authentification onLogin={handleLogin} />
    </div>
  );
};

export default Login