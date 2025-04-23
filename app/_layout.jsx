import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState, createContext } from 'react';
import LoadScreen from "../components/DevelopComponents/LoadScreen";
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';


const SocketContext = createContext(null);

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const socket = useRef(null);
  const colorScheme = useColorScheme();

  async function socketInit() {
    socket.current = new WebSocket('ws://testyandex.onrender.com');

    socket.current.onopen = () => {
      console.log('Connected');
    };

    socket.current.onmessage = async (event) => {
      const dataApi = await JSON.parse(event.data);
      if (dataApi.type === 'initial') {
        setData(dataApi.dataObj);
        setLoaded(true);
      } else if (dataApi.type === 'update') {
        const updateData = (dataApi) => {
          setData(prev => {
            const updateDevices = (devices, updatedDevice) => {
              return devices.map(device =>
                device.id === updatedDevice.id
                  ? { ...device, ...updatedDevice }
                  : device
              );
            };
            return {
              electro: updateDevices(prev.electro, dataApi.dataObj),
              sensors: updateDevices(prev.sensors, dataApi.dataObj),
            };
          });
        };
        updateData(dataApi.dataObj)
      }
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }

  useEffect(() => {
    socketInit();
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  if (!loaded) {
    return <LoadScreen />;
  }

  return (

      <SocketContext.Provider value={{ socket: socket, data }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="controllerInfo" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SocketContext.Provider>

  );
}

export { SocketContext };