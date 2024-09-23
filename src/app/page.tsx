"use client"

import { Fragment, useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import ReactCardFlip from 'react-card-flip';
import Spinner from "@/components/Spinner";
import RainbowText from 'react-rainbow-text';
import { Amatic_SC } from 'next/font/google';

interface Option {
  name: string;
  description: string;
  isOutlier: boolean;
}

interface TileProps {
  option: Option;
  selected: boolean;
  onClick: Function;
  completed: boolean;
  correct: boolean;
}

const amaticSC = Amatic_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap'
});

const Tile = ({ option, selected, onClick, completed, correct }: TileProps) => {
  const [bgColor, setBgColor] = useState('gray');
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { setFlipped(completed) }, [completed]);

  useEffect(() => {
    if (completed) {
      if (!option.isOutlier) {
        setBgColor('purple');
      } else {
        setBgColor(correct ? 'green' : 'red');
      }
    } else {
      setBgColor(selected ? 'purple' : 'gray');
    }
  }, [selected, completed]);

  const hoverStyle = "transition-shadow duration-300 cursor-pointer hover:shadow-md hover:shadow-gray-400 hover:scale-105";

  return (
    <ReactCardFlip isFlipped={flipped} flipSpeedFrontToBack={1}>
      <button
        style={{ width: 200, height: 200 }}
        className={`text-center text-black py-16 px-4 rounded-lg bg-${bgColor}-100 border-2 border-${bgColor}-200 ${hoverStyle}`}
        onClick={() => onClick()}
      >
        <span className={`text-3xl font-bold ${amaticSC.className}`}>{option.name}</span>
      </button>
      <button
        style={{ width: 200, height: 200 }}
        className={`text-black py-2 px-4 rounded-lg flex flex-col items-center justify-center bg-${bgColor}-100 border-2 border-${bgColor}-200`}
      >
        <span className={`text-2xl font-bold mb-2 ${amaticSC.className}`}>{option.name}</span>
        <span className="text-xs">{option.description}</span>
      </button>
    </ReactCardFlip>
  );
};

const Page = () => {
  const [options, setOptions] = useState([]);
  const [connection, setConnection] = useState();
  const [completed, setCompleted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const submitRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [cluesGiven, setCluesGiven] = useState(0);
  const [clues, setClues] = useState([]);
  const [shownClue, setShownClue] = useState(-1);

  useEffect(() => {
    getPuzzle();
  }, []);

  const getPuzzle = async () => {
    const rawPuzzle = await fetch('/api/puzzle', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ a: 1, b: 'Textual content' })
    });

    const puzzleData = await rawPuzzle.json();
    console.log(puzzleData);

    setConnection(puzzleData.connection);
    setOptions(shuffleArray(puzzleData.options));
    setClues(puzzleData.clues);
  };

  const handleSelect = (id: number) => {
    setSelected(previousSelected => (previousSelected == id) ? null : id);
  };

  const getCenter = (ref: { current: HTMLDivElement }): { x: number, y: number } => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      return {
        x: centerX / (window ? window.innerWidth : 1),
        y: centerY / (window ? window.innerHeight : 1)
      }
    }
    return { x: 100, y: 100 };
  }

  const submit = async () => {
    if (selected != null) {
      if (submitRef.current && options[selected].isOutlier) {
        confetti({
          particleCount: 100,
          startVelocity: 30,
          spread: 360,
          origin: getCenter(gridRef)
        });
        confetti({
          origin: getCenter(submitRef)
        });
      };

      setCorrect(options[selected].isOutlier);
      setCompleted(true);
    }
  };

  const getButtonStyle = (flag: boolean,) => flag
    ? "bg-gray-300 hover:bg-gray-200 font-bold border-gray-400 hover:border-gray-300"
    : "bg-purple-500 hover:bg-purple-400 font-bold border-purple-700 hover:border-purple-500";

  const getClueStyle = (index: number,) => {
    if (cluesGiven < (index + 1)) {
      return "bg-gray-300 font-bold border-gray-400";
    }
    return shownClue == index
      ? "bg-purple-500 hover:bg-purple-400 font-bold border-purple-700 hover:border-purple-500"
      : "bg-purple-300 hover:bg-purple-200 font-bold border-purple-700 hover:border-purple-500";
  };

  const getHeader = () => {
    if (!completed) {
      return (
        <div className="flex justify-center">
          <div className="flex flex-col text-right mr-6">
            <div className="text-sm">3 of the 4 share a connection</div>
            <strong className="text-base">Can you identify the outlier?</strong>
          </div>
          <button
            className={`text-white rounded py-2 px-4 border-b-4 ${getButtonStyle(selected == null)}`}
            onClick={submit}
            disabled={selected == null}
            ref={submitRef}
          >
            Submit
          </button>
        </div>
      );
    }

    return (
      <Fragment>
        <span className={`font-bold ${correct ? 'text-green-600' : 'text-red-600'}`}>
          {correct ? "Correct" : "Incorrect"}
        </span>
        <div className="text-sm text-center my-2 font-bold">{connection}</div>
      </Fragment>

    )
  };

  function shuffleArray(array: Array<any>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
  }

  const formatClue = (clue: string) => {
    return clue.includes(": ") ? clue.split(": ")[1] : clue;
  };

  return (
    <main>
      <div className="flex flex-col items-center">
        <h2
          className={`mb-6 text-lg flex flex-col items-center justify-center ${completed && !correct ? 'animate-shake' : ''}`}
          style={{ height: 52 }}
        >
          {getHeader()}
        </h2>
        {
          options.length > 0 ? (
            <Fragment>
              <div className="grid grid-cols-2 gap-6" ref={gridRef}>
                {
                  options.map((option, index) => (
                    <Tile
                      key={`option-${index}`}
                      option={option}
                      selected={selected == index}
                      completed={completed}
                      onClick={() => handleSelect(index)}
                      correct={correct}
                    />
                  ))
                }
              </div>
              <div className="mt-4 flex justify-center items-center gap-2">
                <div>Clues: </div>
                {
                  clues.map((clue, index) => (
                    <button
                      className={`text-white rounded py-2 px-4 text-sm ${getClueStyle(index)}`}
                      onClick={() => setShownClue(index)}
                      disabled={cluesGiven < (index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))
                }
                <button
                  className={`text-white text-xs rounded py-2 px-4 border-b-4 ml-2 ${getButtonStyle(cluesGiven == 4)}`}
                  onClick={() => {
                    setCluesGiven(prev => prev + 1);
                    setShownClue(cluesGiven);
                  }}
                  disabled={cluesGiven == 4}
                >
                  Give Clue
                </button>
              </div>
              {
                shownClue >= 0 && (
                  <div
                    style={{ width: 350 }}
                    className={`mt-4 text-sm text-center text-black p-2 rounded-lg bg-gray-100 border-2 border-gray-200`}
                  >
                    <div className="text-left"><strong>{`🔎 (${shownClue + 1}/4) `}</strong>{`${formatClue(clues[shownClue])}`}</div>
                  </div>
                )
              }

            </Fragment>
          ) : (
            <Spinner />
          )
        }
      </div>
    </main>
  );
}

export default Page;
