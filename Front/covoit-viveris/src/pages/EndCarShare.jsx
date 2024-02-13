import React from 'react';
import { Navbar  }         from "../components/header/Navbar";
import { EndCarshareView } from '../components/endCarShare/EndCarshareView.jsx';


const EndCarShare = () => {
  const id_carshare = 1;
  const navigate = useNavigate();
  const { user } = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/carshare/"+id_carshare)
    .then((res) => {
        return res.json();
    })
    .then((data_json) => {
        console.log("aaa");
        console.log(data_json);
        const carShareUser = {day:data_json.schedule.substring(0, 10), startHour:data_json.schedule.substring(11,16), 
        endHour:"10:00", carShareTime:"1h15", startLocation:data_json.start_place, endLocation:data_json.end_place, 
        co2Saved:895, level:user.level, experience:user.experience, nbPeople:data_json.max_passenger};
        const bonus = {bonusStreak:1.2, bonusPollution:1.5, bonusDay: 1.5};
        const experience_earned = levels.calculate_experience_carShare(carShareUser.nbPeople, bonus.bonusStreak, bonus.bonusPollution, bonus.bonusDay); 
        const level_up  = levels.level_up(carShareUser.level, carShareUser.experience, experience_earned, 0); 
        const level_end = carShareUser.level + level_up;
        const experience_end = levels.experience_user_end_carShare(carShareUser.level, carShareUser.experience, experience_earned);

        setData({carShare:carShareUser, bonus:bonus, experience_earned:experience_earned, 
            level_up:level_up, level_end:level_end, experience_end:experience_end});

        var update_user = {uid:user.uid, level:level_end, experience:experience_end}
        const options = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(update_user)
        };
        fetch("http://localhost:8080/user/"+user.uid, options)
        .then((res) => {
        })
    });
  }, [user]);


  const handleClickRanking = () => {
    navigate('/ranking');
  };

  return (
    <React.Fragment>
        <Navbar />

        <EndCarshareView />
    </React.Fragment>
  );
}

export default EndCarShare;