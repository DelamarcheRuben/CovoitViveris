import React from "react";
import { useState } from 'react';
import { useUser }  from "../../context/UserContext";

const Authentification = ({ onLogin }) => {
  const { user, login, logout } = useUser();
  const [isLeftSideActive, setIsLeftSideActive] = useState(true);
  
  const handleButtonClick = () => {
    setIsLeftSideActive(!isLeftSideActive);
  };

  const handleButtonClickHeader = (b) => {
    if(b && !isLeftSideActive){
      setIsLeftSideActive(!isLeftSideActive);
    }
    else if(!b && isLeftSideActive){
      setIsLeftSideActive(!isLeftSideActive);
    }
  };

  const [loginEmail,       setLoginEmail]       = useState('');
  const [loginPassword,    setLoginPassword]    = useState('');
  const [registerEmail,    setRegisterEmail]    = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleChangeLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleChangeLoginPassword = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleChangeRegisterEmail = (e) => {
    setRegisterEmail(e.target.value);
  };

  const handleChangeRegisterPassword = (e) => {
    setRegisterPassword(e.target.value);
  };

  const handleChangeRegisterConfirmPassword = (e) => {
    setRegisterConfirmPassword(e.target.value);
  };

  const handleLoginClick = () => {
    onLogin(loginEmail, loginPassword);
  };

  return (
      <React.Fragment>
        <div className="small-screen" style={{ boxShadow:"0px 5px 10px rgba(0, 0, 0, 0.2)", padding:"10px" }}>
          <img className="" src="./src/images/logo/logo_v.jpg" alt="Logo Viveris" style={{ width: "35px" }}/>
        </div>
        <div className="small-screen">
          <p className="center color-company" style={{ marginTop:"8vh" }}><strong style={{ fontSize:"30px" }}>Bienvenue,</strong></p>
          <p className="center"><strong style={{ fontSize:"16px" }}>Trouvez votre covoiturage maintenant !</strong></p>
          <div className="center-picture" style={{ maxWidth:"300px" }}>
            <div className="auth-horizontal-line-small" style={{ marginLeft:"135px" }}></div>
          </div>
        </div>
        <div className="small-screen center-picture" style={{ boxShadow:"0px 5px 10px rgba(0, 0, 0, 0.8)", width:"300px", marginTop: "40px" }}>
          <div className="split-header" style={{ marginBottom:"20px" }}>
            <div className={`left-side center-div-picture ${!isLeftSideActive  ? 'non-active-side' : ''}`}>
              <button className={`btn-auth-small ${isLeftSideActive == true ? 'color-company-background' : ''}`} 
                      onClick={() => handleButtonClickHeader(true)}>
                <strong>CONNEXION</strong>
              </button>
            </div>
            <div className={`right-side center-div-picture ${!isLeftSideActive  ? 'non-active-side' : ''}`}>
              <button className={`btn-auth-small ${isLeftSideActive == false ? 'color-company-background' : ''}`} 
                      onClick={() => handleButtonClickHeader(false)}>
                <strong>INSCRIPTION</strong>
              </button>
            </div>
          </div>
          {isLeftSideActive && (
            <React.Fragment>
              <div className="row" style={{ marginBottom:"25px" }}>
                <input type="text"     id="email"    className="input-stylish center-picture" value={loginEmail}    placeholder="Email professionnel" onChange={handleChangeLoginEmail}    style={{ marginBottom:"10px" }}/>
                <input type="password" id="password" className="input-stylish center-picture" value={loginPassword} placeholder="Mot de passe"        onChange={handleChangeLoginPassword} style={{ marginBottom:"25px" }}/>
                <p></p>
                <button className="btn-auth" style={{ marginBottom:"20px" }} onClick={handleLoginClick}>
                  <strong style={{ fontSize:"15px" }}>CONNEXION</strong>
                </button>
              </div>
            </React.Fragment>
          )}
          {!isLeftSideActive && (
            <React.Fragment>
            <div className="row" style={{ maxHeight:"none" }}>
              <input type="text"     id="email"    className="input-stylish center-picture" value={registerEmail}    placeholder="Email professionnel" onChange={handleChangeRegisterEmail}    style={{ marginBottom:"10px" }}/>
              <input type="password" id="password" className="input-stylish center-picture" value={registerPassword} placeholder="Mot de passe"        onChange={handleChangeRegisterPassword} style={{ marginBottom:"10px" }}/>
              <input type="password" id="confirmPassword" className="input-stylish center-picture" value={registerConfirmPassword} placeholder="Confirmation mot de passe" onChange={handleChangeRegisterConfirmPassword} style={{ marginBottom:"25px" }}/>                  <p></p>
              <button className="btn-auth" style={{ marginBottom:"20px" }}>
                <strong style={{ fontSize:"15px" }}>S'INSCRIRE</strong>
              </button>
            </div>
          </React.Fragment>
          )}
        </div>


        
        <div className="large-screen" style={{ boxShadow:"0px 5px 10px rgba(0, 0, 0, 0.2)", padding:"20px" }}>
          <img className="" src="./src/images/logo/logo_viveris.jpg" alt="Logo Viveris" style={{ width: "150px" }}/>
        </div>
        <div className="large-screen" style={{ marginTop:"12vh" }}>
          <p className="center"><strong style={{ fontSize:"30px" }}>Trouvez votre covoiturage maintenant !</strong></p>
          <div className="center-picture" style={{ maxWidth:"300px" }}>
            <div className="auth-horizontal-line-large" style={{ marginLeft:"150px" }}></div>
          </div>
        </div>
        <div className="large-screen" style={{ marginTop:"50px" }}>
          <div className="split-container center center-picture">
            <div className={`left-side center-div-picture ${!isLeftSideActive  ? 'non-active-side' : ''}`}>
              {isLeftSideActive && (
                <React.Fragment>
                  <div className="row" style={{ marginBottom:"25px"}}>
                    <p style={{ marginBottom:"10px" }}><strong style={{ fontSize:"30px" }}>CONNEXION</strong></p>
                    <input type="text"     id="email"    className="input-stylish center-picture" value={loginEmail}    placeholder="Email professionnel" onChange={handleChangeLoginEmail}    style={{ marginBottom:"10px" }}/>
                    <input type="password" id="password" className="input-stylish center-picture" value={loginPassword} placeholder="Mot de passe"        onChange={handleChangeLoginPassword} style={{ marginBottom:"25px" }}/>
                    <p></p>
                    <button className="btn-auth">
                      <strong style={{ fontSize:"15px" }} onClick={handleLoginClick}>CONNEXION</strong>
                    </button>
                  </div>
                </React.Fragment>
              )}
              {!isLeftSideActive && (
                <React.Fragment>
                  <div className="row" style={{ marginBottom:"25px",marginTop:"-25px"}}>
                    <p style={{ marginBottom:"30px"  }}><strong style={{ color:"white", fontSize:"30px"}}>RE-BIENVENUE !</strong></p>
                    <p className="center-picture" style={{ color:"white", marginBottom:"40px", maxWidth:"350px" }}>Connectez vous à votre compte et covoiturez avec vos amis pour réaliser vos trajets du quotidien.</p>

                    <button className="btn-auth" onClick={handleButtonClick}>
                      <strong style={{ fontSize:"15px" }}>CONNEXION</strong>
                    </button>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className={`right-side center-div-picture ${isLeftSideActive ? 'non-active-side' : ''}`}>
              {!isLeftSideActive && (
                <React.Fragment>
                <div className="row" style={{ marginTop:"-55px"}}>
                  <p style={{ marginBottom:"10px" }}><strong style={{ fontSize:"30px" }}>INSCRIPTION</strong></p>
                  <input type="text"     id="email"    className="input-stylish center-picture" value={registerEmail}    placeholder="Email professionnel" onChange={handleChangeRegisterEmail}    style={{ marginBottom:"10px" }}/>
                  <input type="password" id="password" className="input-stylish center-picture" value={registerPassword} placeholder="Mot de passe"        onChange={handleChangeRegisterPassword} style={{ marginBottom:"10px" }}/>
                  <input type="password" id="confirmPassword" className="input-stylish center-picture" value={registerConfirmPassword} placeholder="Confirmation mot de passe" onChange={handleChangeRegisterConfirmPassword} style={{ marginBottom:"15px" }}/>                  <p></p>
                  <button className="btn-auth">
                    <strong style={{ fontSize:"15px" }}>S'INSCRIRE</strong>
                  </button>
                </div>
              </React.Fragment>
              )}
              {isLeftSideActive && (
                <React.Fragment>
                  <div className="row" style={{ marginBottom:"25px" }}>
                    <p style={{ marginBottom:"10px" }}><strong style={{ color:"white", fontSize:"30px" }}>BIENVENUE !</strong></p>
                    <p className="center-picture" style={{ color:"white", marginBottom:"30px", maxWidth:"350px" }}>Créez vous un compte puis renseignez vos informations personnelles pour commencer à covoiturez avec nous.</p>

                    <button className="btn-auth" onClick={handleButtonClick}>
                      <strong style={{ fontSize:"15px" }}>S'INSCRIRE</strong>
                    </button>
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
      );
};

export default Authentification