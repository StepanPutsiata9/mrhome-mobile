import { createContext, useState } from "react";

const ScenariiContext = createContext();

export function ScenariiProvider({ children }) {
  const [scenariiState, setScenariiState] = useState([]);
  const [controllerState, setControllerState] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(true);

  const value = {
    isListEmpty:isListEmpty,
    setIsListEmpty:setIsListEmpty,
    scenariiState:scenariiState,
    controllerState:controllerState,
    setScenariiState:setScenariiState,
    setControllerState:setControllerState,
  };

  return (
    <ScenariiContext.Provider value={value}>
      {children}
    </ScenariiContext.Provider>
  );
}
export {ScenariiContext};