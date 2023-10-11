import {ReactElement} from "react";
import {sessions} from "./data/mockSessions";
import "./style/sessions.scss";

export function Sessions(): ReactElement {
    return (
        <article className="sessions">
            <ul>{
                sessions.map((session, i) => (
                    <li className="session" key={i}>
                        <h3 className="session__details">{session.track} ({session.session})</h3>
                        <div className="session__results">
                            <p>1. {session.first}</p>
                            <p>2. {session.second}</p>
                            <p>3. {session.third}</p>
                        </div>
                        <p className="session__total-drivers">Total drivers: {session.drivers}</p>
                        <p className="session__date">{session.date}</p>
                    </li>
                ))}
            </ul>
        </article>
    )
}

/*
track session; positioned in the middle
positions; positioned in the middle, in a row
drivers; middle as well
date; middle, or actually put it in top right in small font
 */