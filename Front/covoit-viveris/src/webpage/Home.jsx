import React from "react";
import { Navbar } from "../components/header/Navbar";


const COVOITURAGE = [
  { id: "1", heure: "8h30",  lieuDepart: "Gif Sur Yvette", lieuArrivee: "Polytech", journee: "Lundi",    occupe:true},
  { id: "2", heure: "9h30",  lieuDepart: "Gif Sur Yvette", lieuArrivee: "Polytech", journee: "Mardi",    occupe:false},
  { id: "3", heure: "10h30", lieuDepart: "Gif Sur Yvette", lieuArrivee: "Polytech", journee: "Mercredi", occupe:false},
  { id: "4", heure: "11h30", lieuDepart: "Gif Sur Yvette", lieuArrivee: "Polytech", journee: "Jeudi",    occupe:true},
  { id: "5", heure: "12h30", lieuDepart: "Gif Sur Yvette", lieuArrivee: "Polytech", journee: "Vendredi", occupe:false},
]

const Home = () => {

  return (
    <React.Fragment>
      <Navbar />
    </React.Fragment>
  );
}

export default Home;
