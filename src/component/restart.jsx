import React from "react";
import './restart.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

export default function Restart(props){
    return(
        <button className="restartButton" onClick={() => {props.onClick()}}>
            <FontAwesomeIcon icon={faArrowRotateLeft} style={{color: props.gameState==0?"#000000":props.gameState==1?'#fa050d':'#31b02a'}} className='arrow'/>
        </button>
    )
}