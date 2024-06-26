import {ReactElement} from "react";
import {NavLink} from "react-router-dom";
import "./styles/navbar.scss";
import serversSVG from "../../assets/images/servers.svg";
import driversSVG from "../../assets/images/drivers.svg";
import sessionsSVG from "../../assets/images/sessions.svg";
import statsSVG from "../../assets/images/stats.svg";

export function Navbar(): ReactElement {
    return (
        <nav className="navbar">
            <NavLink className="route" to="/">
                <img alt="servers" className="route__img" src={serversSVG}/>
                <p className="route__text">SERVERS</p>
            </NavLink>
            <NavLink className="route" to="/drivers" end>
                <img alt="drivers" className="route__img" src={driversSVG}/>
                <p className="route__text">DRIVERS</p>
            </NavLink>
            <NavLink className="route" to="/sessions">
                <img alt="sessions" className="route__img" src={sessionsSVG}/>
                <p className="route__text">SESSIONS</p>
            </NavLink>
            <NavLink className="route" to="/stats">
                <img alt="stats" className="route__img" src={statsSVG}/>
                <p className="route__text">STATS</p>
            </NavLink>
        </nav>
    )
}