import { Stack, Redirect, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState, createContext } from 'react';
import { AuthProvider, useAuth } from '../Auth/AuthContext';
import LoadScreen from "../components/DevelopComponents/LoadScreen";

const SocketContext = createContext({
  socket: { current: null },
  data: {}
});

function LayoutContent() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const socket = useRef(null);
  const  user = false;
  // const navigation = useNavigation();
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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Registr" />
      </Stack>
    );
  }

  if (!loaded&&user) {
    return <LoadScreen />;
  }

  return (
    <SocketContext.Provider value={{ socket, data }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="controllerInfo" />
        <Redirect href="/(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </SocketContext.Provider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LayoutContent />
    </AuthProvider>
  );
}

export { SocketContext };