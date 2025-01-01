import { useState } from "react";
import "./App.css";

function App() {
  const [trends, setTrends] = useState([]);
  const [savedTrends, setSavedTrends] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runSeleniumScript = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/trendingTopics");
      if (!response.ok) {
        throw new Error("Failed to fetch trending topics.");
      }
      const data = await response.json();
      console.log(data);
      
      setTrends(data.trends || []);
      setClicked(true);

      const savedResponse = await fetch("http://localhost:3000/savedTrends");
      if (!savedResponse.ok) {
        throw new Error("Failed to fetch saved trends.");
      }
      const savedData = await savedResponse.json();
      setSavedTrends(savedData || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ padding: "2rem" }}>
        {!clicked && (
          <a
            onClick={() => {
              runSeleniumScript();
            }}
            style={{ cursor: "pointer" }}
          >
            Click here to run the script
          </a>
        )}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {clicked && (
          <>
            <h3>Trending Topics</h3>
            <ul>
              {trends.map((trend, index) => (
                <li key={index}>{trend}</li>
              ))}
            </ul>

            <h3>Saved Topics from MongoDB</h3>
            <ul>
              {savedTrends.map((trendData, index) => (
                <li key={index}>
                  <strong>Trends:</strong>
                  <ul>
                    {trendData.trends.map((trend, subIndex) => (
                      <li key={subIndex}>{trend}</li>
                    ))}
                  </ul>
                  <p>
                    <strong>IP Address:</strong> {trendData.ipAddress}
                  </p>
                </li>
              ))}
            </ul>
            <a
            onClick={() => {
              runSeleniumScript();
            }}
            style={{ cursor: "pointer" }}
          >
            Click here to run the script again
          </a>
          </>
        )}
      </div>
    </>
  );
}

export default App;
