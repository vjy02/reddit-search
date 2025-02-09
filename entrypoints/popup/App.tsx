import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <h1>Reddit Search</h1>
      <h3>Made by: Victor Yoshida</h3>
    </div>
  );
}

export default App;
