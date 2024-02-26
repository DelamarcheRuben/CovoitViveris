import React from 'react';
import {useLocation} from "react-router-dom";
import { Navbar  }         from "../components/header/Navbar.jsx";
import { DetailsCarshareView } from '../components/detailsCarshare/DetailsCarshareView.jsx';


const DetailsCarshare = () => {

  const location = useLocation();
  
  return (
    <React.Fragment>
        <Navbar />
        <DetailsCarshareView idCarshare={location.state?.idCarshare}/>
    </React.Fragment>
  );
}

export default DetailsCarshare;