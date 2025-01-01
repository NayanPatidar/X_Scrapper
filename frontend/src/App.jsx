import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [trends, setTrends] = useState(0);
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div style={{ padding: "2rem" }}>
        {!clicked && (
          <a onClick={() => setClicked(true)} style={{ cursor: "pointer" }}>
            Click here to run the script
          </a>
        )}
        {clicked && (
          <span>{`These are the most happening topics as on Date and Time of end of Selenium Script`}</span>
        )}
      </div>
    </>
  );
}

export default App;
