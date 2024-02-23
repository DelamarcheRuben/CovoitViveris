import React, { useEffect } from "react";
import { Navbar }      from "../components/header/Navbar";
import { RankingView } from "../components/ranking/RankingView";
import { useWindowWidth } from "../context/WindowWidthContext";

const Ranking = () => {

  return (
    <React.Fragment>
      <Navbar />
      <RankingView />
    </React.Fragment>
  );
};

export default Ranking;