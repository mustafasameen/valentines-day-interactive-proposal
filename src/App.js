// src/App.js
import React, { useState } from "react";
import "./App.css";
import Welcome from "./components/Welcome";
import PandaPuzzle from "./components/PandaPuzzle";
import SkittlesSorting from "./components/SkittlesSorting";
import RomanticTrivia from "./components/RomanticTrivia";

function App() {
  // Manage which stage of the adventure is shown:
  // "welcome" → "puzzle" → "sorting" → "trivia" → "final"
  const [stage, setStage] = useState("welcome");
  // Optionally track the total number of roses earned
  const [roses, setRoses] = useState(0);

  // Handler to move to the next stage
  const nextStage = () => {
    if (stage === "welcome") setStage("puzzle");
    else if (stage === "puzzle") setStage("sorting");
    else if (stage === "sorting") setStage("trivia");
    else if (stage === "trivia");
  };

  return (
    <div className='App'>
      <audio autoPlay loop>
        <source
          src='https://soundcloud.com/glassanimals/tangerine?in=errypye/sets/444-1a'
          type='audio/mpeg'
        />
        Your browser does not support the audio element.
      </audio>
      {stage === "welcome" && <Welcome onStart={nextStage} />}
      {stage === "puzzle" && <PandaPuzzle onComplete={nextStage} />}
      {stage === "sorting" && <SkittlesSorting onComplete={nextStage} />}
      {stage === "trivia" && (
        <RomanticTrivia onComplete={nextStage} setRoses={setRoses} />
      )}
      {/* {stage === "final" && <FinalReveal roses={roses} />} */}
    </div>
  );
}

export default App;
