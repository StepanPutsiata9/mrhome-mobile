import { createContext, useState } from "react";
import axios from "axios"
import { getTokens, storeTokens, clearTokens } from '../../Auth/authStorage';
const ScenariiContext = createContext();
export const api = axios.create({
  baseURL: 'http://testyandex.onrender.com/scenarios',
});

export default function ScenariiProvider({ children }) {
  const [scenariiState, setScenariiState] = useState([]);
  const [controllerState, setControllerState] = useState([]);
  const [controllerStateScen, setControllerStateScen] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(true);
  const [scenCount, setScenCount] = useState(0)
  const [loading,setLoading]=useState(false);
  const value = {
    isListEmpty: isListEmpty,
    setIsListEmpty: setIsListEmpty,
    scenariiState: scenariiState,
    controllerState: controllerState,
    setScenariiState: setScenariiState,
    setControllerState: setControllerState,
    scenCount: scenCount,
    setScenCount: setScenCount,
    controllerStateScen: controllerStateScen,
    setControllerStateScen: setControllerStateScen,
    loading:loading,
    setLoading:setLoading,
  };

  return (
    <ScenariiContext.Provider value={value}>
      {children}
    </ScenariiContext.Provider>
  );
}
export { ScenariiContext };