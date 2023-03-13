import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, replace = false) => {

    setMode(newMode);

    if (replace){
      const arr = [...history];
      arr.pop();
      setHistory( () => [...arr, newMode]);
      return;
    }
    setHistory(() => [...history, newMode]);
  }
  const back = () => { 
    if (history.length === 1) {
      setMode(initial);
      return;
    }
    setHistory(history.splice(-1));
    setMode(history[(history.length - 1)]);
   }

  return { mode, transition, back };
}