import { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Board from "./component/board";
import DrapeauSlider from "./component/drapeauSlider";
import Compteur from "./component/compteurBombe";
import Restart from "./component/restart";
import Timer from "./component/timer";

function App() {
  const [rerender, setRerender] = useState(false);
  const [nbBomb, setNbBomb] = useState(25);
  const [firstClick, setFirstClick] = useState(false);
  const [drapeau, setDrapeau] = useState(false);
  const [nbBombeLeft, setNbBombeLeft] = useState(nbBomb);
  const [gameState, setGameState] = useState(0); //si ==1 alors jeu perdu si ==2 alors jeu gagné
  const [temps, setTemps] = useState(0);
  const [tempsF, setTempsF] = useState(0);

  //création d'un array 2d pour accéder facilement à toutes les cases

  const [cases, setCases] = useState(
    Array(10)
      .fill()
      .map(() =>
        Array(12).fill({
          show: false,
          bomb: false,
          value: 0,
          bombable: true,
          flag: false,
        })
      )
  );


  //Ici toute la logique du jeu; elle se passe quand le joueur clique sur une case
  useEffect(() => {
    if(gameState==0){
      const id = setInterval(() => setTemps((temps) => temps + 1), 1000);
  
      return () => {
        clearInterval(id);
      };

    }
  }, []);

  function handleClick(X, Y) {
    if (gameState == 0) {
      let copieCases = cases;
      //si mode drapeau n'est pas activé
      if (!drapeau) {
        if (!copieCases[X][Y].flag) {
          //si c'est le prremier clique de la partie
          if (!firstClick) {
            setTemps(0)
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
                      flag: copieCases[X - x][Y - y].value,
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
                  flag: copieCases[XBomb][YBomb].value,
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
                    flag: copieCases[index][indexS].value,
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
              flag: copieCases[X][Y].value,
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
                        flag: copieCases[X - x][Y - y].value,
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
                      if (
                        Yel - y >= 0 &&
                        Yel - y < copieCases[Xel - x].length
                      ) {
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
                          flag: copieCases[Xel - x][Yel - y].value,
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
            setTempsF(temps)
            copieCases[X][Y] = {
              show: true,
              bomb: copieCases[X][Y].bomb,
              value: copieCases[X][Y].value,
              bombable: copieCases[X][Y].bombable,
              flag: copieCases[X][Y].value,
            };
            setGameState(1);
            copieCases.forEach((el, index) => {
              el.forEach((elS, indexS) => {
                if (copieCases[index][indexS].bomb) {
                  copieCases[index][indexS] = {
                    show: true,
                    bomb: true,
                    value: copieCases[index][indexS].value,
                    bombable: copieCases[index][indexS].bombable,
                    flag: copieCases[index][indexS].value,
                  };
                }
              });
            });
          }
        }

        //vérifier si le joueur a gagné

        let win = true;

        copieCases.forEach((el, index) => {
          el.forEach((elS, indexS) => {
            if (
              !copieCases[index][indexS].show &&
              !copieCases[index][indexS].bomb
            ) {
              win = false;
            }
          });
        });

        if (win) {
          setTempsF(temps)
          setGameState(2);
        }
      } else {
        //si mode drapeau est activé
        if (!copieCases[X][Y].show) {
          if (copieCases[X][Y].flag) {
            setNbBombeLeft(nbBombeLeft + 1);
          } else {
            setNbBombeLeft(nbBombeLeft - 1);
          }
          console.log("test");
          copieCases[X][Y] = {
            show: false,
            bomb: copieCases[X][Y].bomb,
            value: copieCases[X][Y].value,
            bombable: copieCases[X][Y].bombable,
            flag: !copieCases[X][Y].flag,
          };
          setRerender(!rerender);
        }
      }
      setCases(copieCases);
    }
  }

  let gridTemplate = "auto ".repeat(cases.length);

  function handleDrapeauClick() {
    setDrapeau(!drapeau);
  }

  function handleRestart() {
    setFirstClick(false);
    setNbBombeLeft(nbBomb);
    setGameState(0);
    setCases(
      Array(10)
        .fill()
        .map(() =>
          Array(10).fill({
            show: false,
            bomb: false,
            value: 0,
            bombable: true,
            flag: false,
          })
        )
    );
  }

  //return

  return (
    <div className="App">
      <div className="container">
        <div className="menu">
          <Compteur nbBombeLeft={nbBombeLeft} />
          <Restart
            gameState={gameState}
            onClick={() => {
              handleRestart();
            }}
          />
          <Timer temps={firstClick?gameState==0?temps:tempsF:0}></Timer>
        </div>
        <Board
          stateDrapeau={drapeau}
          cases={cases}
          gridTemplate={gridTemplate}
          handleClick={(X, Y) => {
            handleClick(X, Y);
          }}
        />
        <DrapeauSlider
          stateDrapeau={drapeau}
          onClick={() => {
            handleDrapeauClick();
          }}
        ></DrapeauSlider>
      </div>
    </div>
  );
}

export default App;
