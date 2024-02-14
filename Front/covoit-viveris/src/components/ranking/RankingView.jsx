import React, { useEffect, useState } from "react";
import { useWindowWidth } from "../../context/WindowWidthContext";
import { RankingProfileView } from "./RankingProfileView";

export function RankingView(){

    const windowWidth = useWindowWidth();

    const [usersList, setUsersList] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:8080/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsersList(data);
      });
    }, []);

    return (
        <React.Fragment>
            {window.innerWidth < 1105 && usersList &&
                <div className="small-screen">
                    <p className="center" style={{ marginBottom: "90px" }}>Le classement est actualisé tous les matins. <br></br> Atteignez les plus hautes places pour gagner des récompenses ! </p>
                    <div className="center">
                        <button className="btn" style={{ marginBottom: "20px" }}>Liste des récompenses</button> <br></br>
                    </div>
                                
                    {/* Display ranking with order by experience */}
                    {usersList.sort((a, b) => b.level - a.level).map((u, index) => (
                        <React.Fragment key={index}>
                        {/* Display medal + user if user is in the top 3 otherwise display user only */}
                            {index < 3 
                                ? (
                                <div className="center-div-picture">
                                    <img src={`./src/images/ranking/rank${index + 1}.png`} alt={`Rank ${index + 1}`} width="35vw" />
                                    <div style={{ marginLeft:"2px" }}>
                                        <RankingProfileView key={index} user={u} />
                                    </div>
                                </div>) 
                                : (
                                <div style={{ marginLeft:"45px" }}>
                                    <RankingProfileView key={index} user={u} />
                                </div>
                                )
                            }
                        </React.Fragment>
                    ))} 
                </div>
            }


            {windowWidth >= 1105 && usersList &&
                <div className="large-screen">
                    <div className="ranking-background">
                        <p className="center" style={{ marginBottom: "90px" }}>Le classement est actualisé tous les matins. <br></br> Atteignez les plus hautes places pour gagner des récompenses ! </p>
                        <div className="center">
                            <button className="btn" style={{ marginBottom: "20px" }}>Liste des récompenses</button> <br></br>
                        </div>
                        
                        {usersList.sort((a, b) => b.level - a.level).map((u, index) => (
                        <React.Fragment key={index}>
                            {index < 3 
                                ? (
                                <div className="center-div-picture">
                                    <img src={`./src/images/ranking/rank${index + 1}.png`} alt={`Rank ${index + 1}`} width="75px"/>
                                    <div style={{ marginLeft:"15px" }}>
                                        <RankingProfileView key={index} user={u} />
                                    </div>
                                </div>)
                                : (
                                <div style={{ marginLeft:"90px" }}>
                                    <RankingProfileView key={index} user={u} />
                                </div>
                                )
                            }
                        </React.Fragment>
                        ))}
                    </div>
                </div>
            }
        </React.Fragment>
    );
}