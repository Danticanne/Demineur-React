import React from "react";
import './compteurBombe.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";

export default function Compteur(props){
    return(
        <div className="compteur">
            <FontAwesomeIcon icon={faBomb} className='bombe' style={{ color: "red" }}/>
            <p className="compteurValue">{props.nbBombeLeft}</p>
        </div>
    )
}