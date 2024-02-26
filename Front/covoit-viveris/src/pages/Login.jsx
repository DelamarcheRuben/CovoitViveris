import React from "react";
import { useNavigate  } from "react-router-dom";
import { useUser }      from "../context/UserContext";
import Authentification from "../components/authentification/Authentification";


//https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for(let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};



const Login = () => {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  
  const handleLogin = (username, password) => {
    var hashed_pwd = cyrb53(password);
    const options = {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'password':hashed_pwd
      }
  };
    fetch("http://localhost:8080/user?pseudo="+username, options)
    .then((res) => {
      var data = res.json();
      if(data===null) navigate("/login");
      return data;
    })
    .then((data) => {
        updateUser(data);
        if(data.first_name === null){
          navigate('/registrationDetails');
        }
        else{
          navigate('/home');
        }
    })
    .catch((error) => //if data === null, then error
    {
      window.location.reload();
    });
  };

    const handleRegister = (email, username, password) => {
        // Hashage du mot de passe
        var hashedPassword = cyrb53(password);

        // Préparation de l'objet utilisateur
        const user = {
            email: email,
            pseudo: username,
            password: hashedPassword,
            first_name: null,
            last_name: null,
            job: null,
            picture_background: null,
            car_type: null,
            fuel_consumption: null,
            nb_carshares: 0,
            kilometers: 0,
            level: 1,
            experience: 0,
            bonus_loyalty: 0,
            co2_economy: 0
        };

        // Configuration de la requête
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user) // Conversion de l'objet utilisateur en chaîne JSON
        };

        // Envoi de la requête à l'API
        fetch("http://localhost:8080/user", options)
        .then(response => response.json()) // Conversion de la réponse en JSON
        .then(data => {
            // Traitement de la réponse de l'API
            if(data && data.uid) { // Vérification si l'utilisateur est bien créé
                console.log('Utilisateur créé avec succès', data);
                // Redirection ou mise à jour de l'état de l'application ici
                updateUser(data);
                navigate('/registrationDetails'); // Redirige vers la page de détails de compte
            } else {
                // Gérer l'erreur si l'utilisateur n'est pas créé
                console.error("Erreur lors de la création de l'utilisateur");
            }
        })
        .catch(error => {
            // Gestion des erreurs de la requête
            console.error('Erreur lors de la requête:', error);
        });
    };


    return (
    <div>
      <Authentification onLogin={handleLogin} onRegister={handleRegister}/>
    </div>
  );
};

export default Login;