import React from 'react';
import { Navbar  }         from "../components/header/Navbar";
import { EndCarShareView } from '../components/endCarShare/EndCarShareView';


const EndCarShare = () => {

  return (
    <React.Fragment>
        <Navbar />

        <EndCarShareView />
    </React.Fragment>
  );
}

export default EndCarShare;