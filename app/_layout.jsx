import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { AuthContext, AuthProvider} from '../Auth/AuthContext';
import {ScenariiProvider} from "./(scen)/ScenariiContext"
import LoadScreen from "../components/DevelopComponents/LoadScreen";

const SocketContext = createContext({
  socket: { current: null },
  data: {}
});

function LayoutContent() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const socket = useRef(null);
  const  user = true;

  const updateDevices = (devices, updatedDevice) => {
    return devices.map(device =>
      device.id === updatedDevice.id ? { ...device, ...updatedDevice } : device
    );
  };
  useEffect(() => {
    if (user) {
      const ws = new WebSocket('ws://testyandex.onrender.com');
      ws.onopen = () => {
        console.log('Connected');
        socket.current = ws;
        // if (user?.token) {
        //  ws.send(JSON.stringify({ type: 'auth', token: user.token }));
        // }
      };

      ws.onmessage = (event) => {
        const dataApi = JSON.parse(event.data);
        if (dataApi.type === 'initial') {
          setData(dataApi.dataObj);
          setLoaded(true);
        }else if (dataApi.type === 'update') {
          setData(prev => ({
            electro: updateDevices(prev.electro, dataApi.dataObj),
            sensors: updateDevices(prev.sensors, dataApi.dataObj),
          }));
        }
      };

      return () => ws.close();
    }
  }, [user]);


  if (!user) {
    return (
      <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="registration" />
        {/* <Redirect href="/index" /> */}
      </Stack>
      {/* <Redirect href="/(tabs)" /> */}
      </>
    );
  }
  
  if (!loaded) {
    return <LoadScreen />;
  }

  return (
    <SocketContext.Provider value={{ socket, data }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="controllerInfo" />
          <Stack.Screen name="(tabs)"/>
          <Stack.Screen name="(scen)" />
      </Stack>
      <Redirect href="/(tabs)/" />
      <StatusBar style="auto" />
    </SocketContext.Provider>
  );
}
export default function RootLayout() {
  return (
    <AuthProvider>
      <ScenariiProvider>
        <LayoutContent />
      </ScenariiProvider>
    </AuthProvider>
  );
}
export { SocketContext };