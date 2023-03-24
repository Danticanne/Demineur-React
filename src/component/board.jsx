import React from "react";
import Case from "./case";
import './board.css'

export default function Board(props) {
  return (
    <div className="board" style={{ gridTemplateColumns: props.gridTemplate }}>
      {props.cases.map((mainEl, keyX) => {
        return (
          <div>
            {mainEl.map((sEl, keyY) => {
              return (
                <Case
                  X={keyX}
                  Y={keyY}
                  value={sEl.value}
                  show={sEl.show}
                  bomb={sEl.bomb}
                  onClick={(X, Y) => {
                    props.handleClick(X, Y);
                  }}
                ></Case>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
