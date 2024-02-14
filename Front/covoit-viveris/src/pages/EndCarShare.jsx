import React from 'react';
import { Navbar  }         from "../components/header/Navbar.jsx";
import { EndCarshareView } from '../components/endCarShare/EndCarshareView.jsx';


const EndCarShare = () => {
  
  return (
    <React.Fragment>
        <Navbar />
        <EndCarshareView />
    </React.Fragment>
  );
}

export default EndCarShare;