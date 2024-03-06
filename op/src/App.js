// App.js
import React, { useState } from "react";
import "./App.css";
import {PersonalityForm} from "./components/PersonalityForm";

function App() {
  const [personality, setPersonality] = useState("");

  const handleFormSubmit = (result) => {
    setPersonality(result);
  };

  return (
    <div className="App">
      <PersonalityForm onSubmit={handleFormSubmit} />
      {personality && (
        <div className="personality-result">
          <h3>Your personality is:</h3>
          <p>{personality}</p>
        </div>
      )}
    </div>
  );
}

export default App;


/*import React, { useState } from "react";
import "./App.css";
import {MetaMaskConnect} from "./components/MetaMaskConnect";
import {PersonalityForm} from "./components/PersonalityForm";

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showPersonalityForm, setShowPersonalityForm] = useState(false);

  const handleWalletConnect = () => {
    setIsWalletConnected(true);
  };

  const handleSubmitPersonalityForm = () => {
    // Logic to handle form submission
    console.log("Personality form submitted!");
  };

  return (
    <div className="App">
      {!isWalletConnected ? (
        <MetaMaskConnect onConnect={handleWalletConnect} />
      ) : (
        <>
         <PersonalityForm/>
        </>
      )}
    </div>
  );
}

export default App;
*/