var badgeID = [1, 3, 4, 6, 7];
var badgeTitle = ["Covoitureur", "Kilométrage", "Eco-citoyen", "Annonceur", "Partenaire"];
var badgeLevel = ["Bronze", "Argent", "Or", "Diamant"];

export async function updateLevelBadge(userId) {
    if(userId === undefined) return;
    var user;
    const reponse_user = await fetch("http://localhost:8080/user/"+userId);
    user = await reponse_user.json();
    for(var index=0; index<badgeID.length; index++){
        var idBadge = badgeID[index];
        const ownedbadge = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch("http://localhost:8080/ownedbadge?badge="+idBadge+"&user="+user.uid, ownedbadge)
        .then((res) =>  res.json())
        .then((res1) => { 
            var requete = false;
            var level = res1.level;

            if (level != 4) {
                const badge = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                fetch("http://localhost:8080/badge/" + idBadge, badge)
                .then((res) =>  res.json())
                .then((res2) => {
                    console.log(user);
                    var goals = res2.goals.split(", ");
                    var stat  = user.nb_carshares;
                    if(idBadge == 3){
                        stat = user.kilometers;
                    } 
                    else if(idBadge == 4){
                        stat = user.co2_economy;
                    }
                    else if(idBadge == 6){
                        const carshares = {
                          method: "GET",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        };
                        
                        fetch("http://localhost:8080/proposed-carshares?id_user=" + user.uid, carshares)
                        .then((res) =>  res.json())
                        .then((res3) => {
                            stat = res3.length;
                        });
                    }
                    else if(idBadge == 7){
                        const people = {
                          method: "GET",
                          headers: {
                            "Content-Type": "application/json",
                          },
                        };

                        fetch(
                          "http://localhost:8080/distinct-passengers?id_user=" + idBadge,
                          people
                        ).then((res3) => {
                          stat = res3.length;
                        });
                    }


                    if(level = 0 && stat >= goals[0]){
                        requete = true;
                        level += 1;
                    } 
                    else if(level = 1 && stat >= goals[1]){
                        requete = true;
                        level += 1;
                    } 
                    else if(level = 2 && stat >= goals[2]){
                        requete = true;
                        level += 1;
                    } 
                    else if(level = 3 && stat >= goals[3]){
                        requete = true;
                        level += 1;
                    } 
                        
                    if (requete) {
                        var badgeUpdate = {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                level: level
                            })
                        };

                        fetch("http://localhost:8080/ownedbadge?badge="+idBadge+"&user="+user.uid, badgeUpdate)
                        .then((res) => {
                            if (!res.ok) {
                                throw new Error("La modification du level du badge a échoué.");
                            }
                            openSnackbar('Badge "'+badgeTitle[index]+'" en '+badgeLevel[level - 1] +" débloqué !", "success");
                        });
                    }
                });
            }
        });
    }
}