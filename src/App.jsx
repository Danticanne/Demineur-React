import { faL } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./App.css";
import Board from "./component/board";
import DrapeauSlider from "./component/drapeauSlider";

function App() {
  const [rerender, setRerender] = useState(false);
  const [nbBomb, setBomb] = useState(20);
  const [firstClick, setFirstClick] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [drapeau, setDrapeau] = useState(false)

  //création d'un array 2d pour accéder facilement à toutes les cases

  const [cases, setCases] = useState(
    Array(10)
      .fill()
      .map(() =>
        Array(10).fill({
          show: false,
          bomb: false,
          value: 0,
          bombable: true,
        })
      )
  );

  //Ici toute la logique du jeu; elle se passe quand le joueur clique sur une case

  function handleClick(X, Y) {
    if (!gameOver) {
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
            if (!copieCases[index][indexS].bomb) {
              let nbBombAutour = 0;

              for (let x = -1; x <= 1; x++) {
                if (index - x >= 0 && index - x < copieCases.length) {
                  for (let y = -1; y <= 1; y++) {
                    if (
                      indexS - y >= 0 &&
                      indexS - y < copieCases[index - x].length
                    ) {
                      copieCases[index - x][indexS - y].bomb
                        ? (nbBombAutour += 1)
                        : null;
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
          });
        });
      }

      //si clique sur une case qui n'est pas une bombe :

      if (!copieCases[X][Y].bomb) {
        copieCases[X][Y] = {
          show: true,
          bomb: copieCases[X][Y].bomb,
          value: copieCases[X][Y].value,
          bombable: copieCases[X][Y].bombable,
        };

        let copieUnverified = [];

        setRerender(!rerender);

        //si la valeur est nulle, réveler toutes les cases jusqu'à trouver des cases avec des bombes autour

        if (copieCases[X][Y].value == 0) {
          for (let x = -1; x <= 1; x++) {
            if (X - x >= 0 && X - x < copieCases.length) {
              for (let y = -1; y <= 1; y++) {
                if (Y - y >= 0 && Y - y < copieCases[X - x].length) {
                  if (copieCases[X - x][Y - y].value == 0) {
                    copieUnverified.push({ X: X - x, Y: Y - y });
                  }
                  copieCases[X - x][Y - y] = {
                    show: true,
                    bomb: copieCases[X - x][Y - y].bomb,
                    value: copieCases[X - x][Y - y].value,
                    bombable: copieCases[X - x][Y - y].bombable,
                  };
                }
              }
            }
          }

          //while loop pour trouver toutes les cases vide à partir de celle cliqué juste au dessus

          while (copieUnverified != []) {
            let Xel = copieUnverified[0].X;
            let Yel = copieUnverified[0].Y;
            for (let x = -1; x <= 1; x++) {
              if (Xel - x >= 0 && Xel - x < copieCases.length) {
                for (let y = -1; y <= 1; y++) {
                  if (Yel - y >= 0 && Yel - y < copieCases[Xel - x].length) {
                    if (
                      copieCases[Xel - x][Yel - y].value == 0 &&
                      !copieCases[Xel - x][Yel - y].show
                    ) {
                      copieUnverified.push({ X: Xel - x, Y: Yel - y });
                    }
                    copieCases[Xel - x][Yel - y] = {
                      show: true,
                      bomb: copieCases[Xel - x][Yel - y].bomb,
                      value: copieCases[Xel - x][Yel - y].value,
                      bombable: copieCases[Xel - x][Yel - y].bombable,
                    };
                  }
                }
              }
            }
            copieUnverified.splice(0, 1);
            console.log(copieUnverified);
          }
        }
      } else {
        //si clique sur bombe
        copieCases[X][Y] = {
          show: true,
          bomb: copieCases[X][Y].bomb,
          value: copieCases[X][Y].value,
          bombable: copieCases[X][Y].bombable,
        };
        setGameOver(true);
        copieCases.forEach((el, index) => {
          el.forEach((elS, indexS) => {
            if (copieCases[index][indexS].bomb) {
              copieCases[index][indexS] = {
                show: true,
                bomb: true,
                value: copieCases[index][indexS].value,
                bombable: copieCases[index][indexS].bombable,
              };
            }
          });
        });
      }

      setCases(copieCases);
    }
  }

  let gridTemplate = "auto ".repeat(cases.length);

  function handleDrapeauClick(){
    setDrapeau(!drapeau)
  }

  //return

  return (
    <div className="App">
      <Board
        cases={cases}
        gridTemplate={gridTemplate}
        handleClick={(X, Y) => {
          handleClick(X, Y);
        }}
      />
      <DrapeauSlider stateDrapeau={drapeau} onClick={() => {handleDrapeauClick()}}></DrapeauSlider>
    </div>
  );
}

export default App;
