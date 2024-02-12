import React from "react";
import { useState, useEffect } from 'react';
import { Navbar } from "../components/header/Navbar";
import { useUser } from "../context/UserContext";
import { ResearchCarShareView } from "../components/research/ResearchCarShareView";

const Research = () => {

  const { user } = useUser();
  const [carShareList, setCarShareList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/not-full-carshares?id_user=" + user.uid)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCarShareList(data);
      });
  }, []);

  return (
    <React.Fragment>
      <Navbar />
        {carShareList && carShareList.length == 0
          ?
          <p className="center"><strong style={{ fontSize:"40px" }}>Aucun Résultat</strong></p>
          :
          carShareList.map((carshare, index) => (
          <React.Fragment key={index}>
            {/* Display medal + user if user is in the top 3 otherwise display user only */}
            {carshare.driver.uid == user.uid ? (
              <div></div>
            ) : (
              <ResearchCarShareView key={index} carshare={carshare} />
            )}

          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default Research