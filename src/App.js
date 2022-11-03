import "./App.css";

import { useEffect, useState } from "react";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { Howl } from "howler";

import cymbalIcon from "./icons/cymbal.png";
import bassIcon from "./icons/bass.png";
import tomIcon from "./icons/tom.png";
import hihatIcon from "./icons/hihat.png";
import snareIcon from "./icons/snare.png";

function App() {
  const { height, width } = useWindowDimensions();

  const colors = [
    "#320d6d",
    "#ffbfb7",
    "#ffd447",
    "#eeba49",
    "#dca04a",
    "#b86c4d",
    "#700353",
    "#4c1c00",
  ];

  const [bass, setBass] = useState(null);
  const [cymbal, setCymbal] = useState(null);
  const [hihat, setHihat] = useState(null);
  const [snare, setSnare] = useState(null);
  const [tom, setTom] = useState(null);
  const [smallTom, setSmallTom] = useState(null);
  const [mediumTom, setMediumTom] = useState(null);
  const [riseCymbal, setRiseCymbal] = useState(null);

  const [circles, setCircles] = useState([]);

  const instrumentList = [
    bass,
    cymbal,
    hihat,
    snare,
    tom,
    smallTom,
    mediumTom,
    riseCymbal,
  ];

  useEffect(() => {
    setBass(
      new Howl({
        src: ["/sounds/bass.mp3"],
      })
    );
    setCymbal(
      new Howl({
        src: ["/sounds/cymbal.mp3"],
      })
    );
    setHihat(
      new Howl({
        src: ["/sounds/hihat.mp3"],
      })
    );
    setSnare(
      new Howl({
        src: ["/sounds/snare.mp3"],
      })
    );
    setTom(
      new Howl({
        src: ["/sounds/tom.mp3"],
      })
    );
    setSmallTom(
      new Howl({
        src: ["/sounds/smalltom.mp3"],
      })
    );
    setMediumTom(
      new Howl({
        src: ["/sounds/medtom.mp3"],
      })
    );
    setRiseCymbal(
      new Howl({
        src: ["sounds/riseCymbal.mp3"],
        volume: 0.3,
      })
    );
  }, []);

  const playSound = (instrument) => {
    const index = instrumentList.indexOf(instrument);
    const top = Math.floor(Math.random() * (height - height / 16));
    const left = Math.floor(Math.random() * (width - width / 16));
    setCircles((oldArr) => [...oldArr, [colors[index], top, left]]);
    instrument.play();
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "s":
        playSound(hihat);
        break;
      case "e":
        playSound(cymbal);
        break;
      case " ":
        playSound(bass);
        break;
      case "d":
        playSound(snare);
        break;
      case "k":
        playSound(tom);
        break;
      case "f":
        playSound(smallTom);
        break;
      case "j":
        playSound(mediumTom);
        break;
      case "l":
        playSound(riseCymbal);
        break;
      default:
        break;
    }
  };
  console.log(circles);
  const keyMap = {
    d: "snare",
    f: "smallTom",
    j: "mediumTom",
    k: "tom",
    l: "riseCymbal",
    s: "hihat",
    e: "cymbal",
    space: "bass",
  };
  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="container">
      <h1>Baby's first drumkit</h1>
      <p>Have you ever wanted to mess with the drums? Well now you can! </p>
      <p>
        the drums below are playable with your keyboard (or by clicking on the
        icons). It is mapped as following
      </p>
      <ul>
        {Object.keys(keyMap).map((key) => {
          return (
            <li>
              {key} : {keyMap[key]}
            </li>
          );
        })}
      </ul>
      <div className="drumkit-container">
        <img
          src={hihatIcon}
          alt=""
          onClick={() => playSound(hihat)}
          className="hihat icon"
        />
        <img
          src={cymbalIcon}
          alt=""
          onClick={() => playSound(cymbal)}
          className="cymbal icon"
        />
        <img
          src={snareIcon}
          alt=""
          onClick={() => playSound(snare)}
          className="snare icon"
        />
        <img
          src={bassIcon}
          alt=""
          onClick={() => playSound(bass)}
          className="bass icon"
        />
        <img
          src={tomIcon}
          alt=""
          onClick={() => playSound(smallTom)}
          className="icon small-tom"
        />
        <img
          src={tomIcon}
          alt=""
          onClick={() => playSound(mediumTom)}
          className="icon medium-tom"
        />
        <img
          src={tomIcon}
          alt=""
          onClick={() => playSound(tom)}
          className="icon floor-tom"
        />
        <img
          src={cymbalIcon}
          alt=""
          onClick={() => playSound(riseCymbal)}
          className="icon rise-cymbal"
        />
      </div>

      {circles.map((tuple) => {
        const color = tuple[0];
        const top = tuple[1];
        const left = tuple[2];
        return (
          <div
            className="circle"
            style={{ top: top, left: left, backgroundColor: color }}
          />
        );
      })}
    </div>
  );
}

export default App;
