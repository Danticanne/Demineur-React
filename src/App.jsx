import { faL } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./App.css";
import Case from "./component/case";

function App() {
  const [nbBomb, setBomb] = useState(15);
  const [firstClick, setFirstClick] = useState(false);
  const [unverifiedCases, setUnverifiedCases] = useState([]);
  const [cases, setCases] = useState(
    Array(10)
      .fill()
      .map(() =>
        Array(10).fill({
          show: true,
          bomb: false,
          value: 0,
          bombable: true,
        })
      )
  );

  function handleClick(X, Y) {
    let copieCases = cases;
    if (!firstClick) {
      setFirstClick(true);
      //chaque element autour de l'element X Y est ciblé :
      for (let x = -1; x <= 1; x++) {
        if (X - x >= 0 && X - x < copieCases.length) {
          for (let y = -1; y <= 1; y++) {
            if (Y - y >= 0 && Y - y < copieCases[X - x].length) {
              copieCases[X - x][Y - y] = {
                show: copieCases[X - x][Y - y].show,
                bomb: false,
                value: copieCases[X - x][Y - y].value,
                bombable: false,
              };
            }
          }
        }
      }
      //créer exactement le nombre de bombe sans qu'elles se chevauchent
      for (let i = 0; i < nbBomb; i++) {
        let XBomb = Math.floor(Math.random() * copieCases.length);
        let YBomb = Math.floor(Math.random() * copieCases[0].length);
        while (copieCases[XBomb][YBomb].bombable == false) {
          XBomb = Math.floor(Math.random() * copieCases.length);
          YBomb = Math.floor(Math.random() * copieCases[0].length);
        }
        console.log(XBomb);
        if (copieCases[XBomb][YBomb].bombable) {
          copieCases[XBomb][YBomb] = {
            show: copieCases[XBomb][YBomb].show,
            bomb: true,
            value: copieCases[XBomb][YBomb].value,
            bombable: false,
          };
        }
      }
      //mettre valeur à chaque case
      copieCases.forEach((el, index) => {
        el.forEach((elS, indexS) => {
          if(!(copieCases[index][indexS].bomb)){
            
            let nbBombAutour = 0
  
            for (let x = -1; x <= 1; x++) {
              if (index - x >= 0 && index - x < copieCases.length) {
                for (let y = -1; y <= 1; y++) {
                   if (indexS - y >= 0 && indexS - y < copieCases[index - x].length) {
                    copieCases[index - x][indexS - y].bomb?nbBombAutour += 1:null
                  }
                }
              }
            }
  
            copieCases[index][indexS] = {
              show: copieCases[index][indexS].show,
              bomb: false,
              value: nbBombAutour,
              bombable: copieCases[index][indexS].bombable,
            };
          }

        })
      })
    }
    setCases(copieCases);
  }

  let gridTemplate = "auto ".repeat(cases.length);

  return (
    <div className="App">
      <div className="board" style={{ gridTemplateColumns: gridTemplate }}>
        {cases.map((mainEl, keyX) => {
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
                      handleClick(X, Y);
                    }}
                  ></Case>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
