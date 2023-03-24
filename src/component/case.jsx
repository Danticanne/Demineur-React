import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-solid-svg-icons";
import "./case.css";

export default function Case(props) {
  let classname = !props.show ? "case unrevealed" : "case";
  return (
    <div
      className={classname}
      onClick={() => {
        props.onClick(props.X, props.Y);
      }}
    >
      {props.bomb ? (
        <FontAwesomeIcon icon={faBomb} className='bombe' style={{ color: "red" }}/>
      ) : (
        <p
          style={{
            color:
              props.value == 1 ? "blue" : props.value == 2 ? "green" : "red",
          }}
        >
          {props.value == 0 ? " " : props.value}
        </p>
      )}
      {(props.stateDrapeau && !props.show) || (props.flag && !props.show) ? (
        !props.flag ? (
          <FontAwesomeIcon
            icon={faFlag}
            style={{ color: "rgb(150, 150, 150)" }}
            className="drapeauCase"
          />
        ) : (
          <FontAwesomeIcon
            icon={faFlag}
            style={{ color: "#710f85" }}
            className="drapeauCase"
          />
        )
      ) : null}
    </div>
  );
}
