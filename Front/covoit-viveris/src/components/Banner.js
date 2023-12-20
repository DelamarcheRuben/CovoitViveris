import '../styles/banner.css'
import logo from '../assets/voiture.jpg'


function Header({title}) {
    return (<h1 className="title">{title.toUpperCase()}</h1>);
}

function Description() {
    const text = "Application de covoiturage gamifiée";
    return (<p>{text}</p>);
}

function Banner({title}){
    return(<div className="banner">
        <img src={logo} alt="Covoiturage" className="logo"></img>
        <Header title={title}/><Description/>
        </div>);
}

export default Banner

