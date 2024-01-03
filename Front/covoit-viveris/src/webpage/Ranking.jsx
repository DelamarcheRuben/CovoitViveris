import React from "react";
import { Navbar }      from "../components/header/Navbar";
import { ProfileView } from "../components/ProfileView";

const users = [{ name: "Esteban",   job: "Dev Full-Stack",   location: "Boulogne-Billancourt", carShares: 549, kilometers: 8754, experience: 109, picture: "mountain" },
               { name: "Alexandra", job: "Business Analyst", location: "Montpellier",          carShares: 93,  kilometers: 2750, experience: 47,  picture: "mountain" },
               { name: "Enzo",      job: "Developper",        location: "Nice",                carShares: 80,  kilometers: 1800, experience: 35,  picture: "sky"      },
               { name: "Dimitri",   job: "IT Manager",       location: "Boulogne-Billancourt", carShares: 58,  kilometers: 1500, experience: 33,  picture: "forest"   },
               { name: "Solenne",   job: "UX Designer",      location: "Montpellier",          carShares: 43,  kilometers: 1240, experience: 28,  picture: "land"     },
               { name: "Yann",      job: "RH",               location: "Montpellier",          carShares: 39,  kilometers: 1150, experience: 6,  picture: "desert"   }
]

const Ranking = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="ranking-background">
        <p className="center" style={{ marginBottom: "20px" }}>Le classement est actualisé tous les matins. <br></br> Atteignez les plus hautes places pour gagner des récompenses ! </p>
        <div className="center">
          <button className="btn" style={{marginBottom: "70px"}}>Liste des récompenses</button>
        </div>
        {users.map((u, index) => (
          <ProfileView key={index} user={u} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Ranking