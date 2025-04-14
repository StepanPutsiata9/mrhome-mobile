import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
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
        setData(prev => prev.map(item => 
          item.map(itemCurrent =>
            itemCurrent.id === dataApi.item.id ? dataApi.item : itemCurrent
          )
        ));
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SocketContext.Provider value={{ socket: socket.current, data }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="controllerInfo" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SocketContext.Provider>
    </ThemeProvider>
  );
}

export { SocketContext };