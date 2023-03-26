import {React, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import './timer.css'


export default function Timer(props){
    return(
        <div className="timer">
            <FontAwesomeIcon icon={faStopwatch} style={{color: "red",}} className='stopWatch'/>
            <p>{props.temps}</p>
        </div>
    )
}