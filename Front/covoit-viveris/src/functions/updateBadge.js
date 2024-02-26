var badgeID = [1, 3, 4, 6, 7];
var badgeTitle = ["Covoitureur", "Kilométrage", "Eco-citoyen", "Annonceur", "Partenaire"];
var badgeLevel = ["Bronze", "Argent", "Or", "Diamant"];

export async function updateLevelBadge(userId, index) {

    if(userId === undefined) return;
    if(index >= badgeID.length) return; 
    
    var user;
    const reponse_user = await fetch("http://localhost:8080/user/"+userId);
    user = await reponse_user.json();

    var idBadge = badgeID[index];
    var reponse = await fetch("http://localhost:8080/ownedbadge?badge="+idBadge+"&user="+user.uid)
    var res1 = await reponse.json();
    var requete = false;
    var level = res1.level;
    if (level != 4) {
        reponse = await fetch("http://localhost:8080/badge/" + idBadge)
        var res2 = await reponse.json();
        var goals = res2.goals.split(", ");
        var stat  = user.nb_carshares;
        if(idBadge == 3){
            stat = user.kilometers;
        } 
        else if(idBadge == 4){
            stat = user.co2_economy;
        }
        else if(idBadge == 6){
            reponse = await fetch("http://localhost:8080/proposed-carshares?id_user=" + user.uid)
            var res3 = await reponse.json();
            stat = res3.length;
        }
        else if(idBadge == 7){
            reponse = await fetch("http://localhost:8080/nb-distinct-passengers?id_user=" + idBadge)
            var res3 = await reponse.json();
            stat = parseInt(res3);
        }
        console.log(goals);
        console.log("stat", stat, "level", level);
        if(level == 0 && stat >= goals[0]){
            console.log("a");
            requete = true;
            level += 1;
        } 
        else if(level== 1 && stat >= goals[1]){
            console.log("b");
            requete = true;
            level += 1;
        } 
        else if(level == 2 && stat >= goals[2]){
            console.log("c");
            requete = true;
            level += 1;
        } 
        else if(level == 3 && stat >= goals[3]){
            console.log("d");
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
                console.log('Badge "'+badgeTitle[index]+'" en '+badgeLevel[level - 1] +" débloqué !");
                // openSnackbar('Badge "'+badgeTitle[index]+'" en '+badgeLevel[level - 1] +" débloqué !", "success");
            });
        }
    }

    await updateLevelBadge(userId, index+1);
}