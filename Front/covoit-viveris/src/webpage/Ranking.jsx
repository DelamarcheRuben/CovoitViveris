import React from "react";
import { useState, useEffect } from 'react';
import { Navbar }      from "../components/header/Navbar";
import { ProfileView } from "../components/ProfileView";

// const users = [{ UID: 1, pseudo: "Esteban",   job: "Dev Full-Stack",   city: "Boulogne-Billancourt", nb_carshares: 549, kilometers: 8754, experience: 109, picture_background: "mountain" },
//                { UID: 2, pseudo: "Alexandra", job: "Business Analyst", city: "Montpellier",          nb_carshares: 93,  kilometers: 2750, experience: 47,  picture_background: "mountain" },
//                { UID: 3, pseudo: "Enzo",      job: "Developper",        city: "Nice",                nb_carshares: 80,  kilometers: 1800, experience: 35,  picture_background: "sky"      },
//                { UID: 4, pseudo: "Dimitri",   job: "IT Manager",       city: "Boulogne-Billancourt", nb_carshares: 58,  kilometers: 1500, experience: 33,  picture_background: "forest"   },
//                { UID: 5, pseudo: "Solenne",   job: "UX Designer",      city: "Montpellier",          nb_carshares: 43,  kilometers: 1240, experience: 28,  picture_background: "land"     },
//                { UID: 6, pseudo: "Yann",      job: "RH",               city: "Montpellier",          nb_carshares: 39,  kilometers: 1150, experience: 6,  picture_background: "desert"   }
// ]

const Ranking = () => {

  const [usersList, setUsersList] = useState([]); //initiate usersList to empty
  //const [usersList, setUsersList] = useState(users);


  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUsersList(data);
      });
  }, []);

  const addLevel = () => {
    const uid_update = 4;
    const newList = usersList.map(item => {

      if (item.UID === uid_update) {
        const data = { ...item, experience: item.experience+1 };
        const options = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };
        fetch("http://localhost:8080/user/"+uid_update, options)
        .then((res) => {
        })
        return data;
      }
      return item;
    });
    

    // Update the users list
    setUsersList(newList);
  };

  return (
    <React.Fragment>
      <Navbar />
      <div className="ranking-background">
        <p className="center" style={{ marginBottom: "20px" }}>Le classement est actualisé tous les matins. <br></br> Atteignez les plus hautes places pour gagner des récompenses ! </p>
        <div className="center">
          <button className="btn" style={{ marginBottom: "10px" }}>Liste des récompenses</button> <br></br>
          <button className="btn" style={{ marginBottom: "70px" }} onClick={addLevel}>+1 level</button>
        </div>
        {usersList.sort((a, b) => b.experience - a.experience).map((u, index) => (
          <ProfileView key={index} user={u} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Ranking