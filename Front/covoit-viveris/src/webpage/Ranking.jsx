import React from "react";
import { Navbar }      from "../components/header/Navbar";
import { ProfileView } from "../components/ProfileView";

const users = [{ pseudo: "Esteban",   job: "Dev Full-Stack",   city: "Boulogne-Billancourt", nb_carshares: 549, kilometers: 8754, experience: 109, picture_background: "mountain" },
               { pseudo: "Alexandra", job: "Business Analyst", city: "Montpellier",          nb_carshares: 93,  kilometers: 2750, experience: 47,  picture_background: "mountain" },
               { pseudo: "Enzo",      job: "Developper",        city: "Nice",                nb_carshares: 80,  kilometers: 1800, experience: 35,  picture_background: "sky"      },
               { pseudo: "Dimitri",   job: "IT Manager",       city: "Boulogne-Billancourt", nb_carshares: 58,  kilometers: 1500, experience: 33,  picture_background: "forest"   },
               { pseudo: "Solenne",   job: "UX Designer",      city: "Montpellier",          nb_carshares: 43,  kilometers: 1240, experience: 28,  picture_background: "land"     },
               { pseudo: "Yann",      job: "RH",               city: "Montpellier",          nb_carshares: 39,  kilometers: 1150, experience: 6,  picture_background: "desert"   }
]

// var users = [];
// async function getUsers() {
//   const response = await fetch("http://localhost:8080/users");
//   users = await response.json();
// }
// await getUsers();

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