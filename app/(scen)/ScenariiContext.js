import { createContext, useState } from "react";

const ScenariiContext = createContext();

export default function ScenariiProvider({ children }) {
  const [scenariiState, setScenariiState] = useState([]);
  const [controllerState, setControllerState] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(true);
  const [scenCount,setScenCount]=useState(0)

  const value = {
    isListEmpty:isListEmpty,
    setIsListEmpty:setIsListEmpty,
    scenariiState:scenariiState,
    controllerState:controllerState,
    setScenariiState:setScenariiState,
    setControllerState:setControllerState,
    scenCount:scenCount,
    setScenCount:setScenCount,
  };

  return (
    <ScenariiContext.Provider value={value}>
      {children}
    </ScenariiContext.Provider>
  );
}
export {ScenariiContext};