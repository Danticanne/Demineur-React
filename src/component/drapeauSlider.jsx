import React from "react";
import './drapeauSlider.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

export default function DrapeauSlider(props){
    return(
        <div className="sliderContainer" onClick={() => {props.onClick()}}>
            <div className="boutonSlider" style={{translate : (props.stateDrapeau)?'100% 0': '0 0'}}>
                {(props.stateDrapeau)?<FontAwesomeIcon icon={faFlag} style={{color: "#710f85",}} className="drapeau"/>:<FontAwesomeIcon icon={faFlag} style={{color: "grey",}} className="drapeau"/>}
            </div>
        </div>
    )
}
