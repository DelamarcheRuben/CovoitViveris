import React from "react";
import { Navbar }      from "../components/header/Navbar";
import { RankingView } from "../components/ranking/RankingView";

const Ranking = () => {

  return (
    <React.Fragment>
      <Navbar />
      <RankingView />
    </React.Fragment>
  );
};

export default Ranking