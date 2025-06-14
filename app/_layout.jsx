import { Stack, Redirect, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState, createContext, useMemo, useContext } from 'react';
import { AuthContext, AuthProvider } from '../Auth/AuthContext';
import ScenariiProvider from "./(scen)/ScenariiContext"
import LoadScreen from "../components/DevelopComponents/LoadScreen";
import { SafeAreaView } from 'react-native-safe-area-context';

const SocketContext = createContext({
  socket: { current: null },
  data: {}
});

function LayoutContent() {
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const socket = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, token } = useContext(AuthContext);


  const updateDevices = (devices, updatedDevice) => {
    return devices.map(device => {
      if (device.payload.id === updatedDevice.payload.id) {
        return {
          ...device,
          payload: {
            ...device.payload,
            ...updatedDevice.payload
          }
        };
      }
      return device;
    });
  };
  useEffect(() => {
    // fetch data from API
    if (user && token) {
      console.log('====================================');
      console.log("user ", user, " token ", token);
      console.log('====================================');
      const ws = new WebSocket(`ws://testyandex.onrender.com?token=${token}`);
      ws.onopen = () => {
        console.log('Connected');
        console.log('====================================');
        console.log(token);
        console.log('====================================');
        socket.current = ws;
      };

      ws.onmessage = (event) => {
        const dataApi = JSON.parse(event.data);
        if (dataApi.type === 'initial') {
          console.log("initial");
          setData(dataApi.dataObj);
          console.log("sensors ",dataApi.dataObj.sensors);
          console.log(data);
          setLoaded(true);
        } else if (dataApi.type === 'update') {
          console.log('====================================');
          console.log("update ",dataApi.dataObj);
          console.log('====================================');
          setData(prev => ({
            electro: updateDevices(prev.electro, dataApi.dataObj),
            sensors: updateDevices(prev.sensors, dataApi.dataObj),
          }));
        }
      };
      return () => ws.close();
    }
  }, [user, token]);

  useEffect(() => {
    if (loaded && pathname !== "/(tabs)/") {
      router.replace("/(tabs)/");
    }
  }, [loaded]);
  const contextValue = useMemo(() => ({
    socket,
    data
  }), [socket.current, data.electro, data.sensors]);
  if (!user && !loaded) {
    return (
      <>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="registration" />
        </Stack>
      </>
    );
  }
  if (!loaded && user) {
    if (!data?.electro || !data?.sensors) {
      return <LoadScreen />;
    }
  }
  if (loaded && user) {
    return (
      <SocketContext.Provider value={contextValue}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="controllerInfo" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(scen)/NewScenarii" />
          <Stack.Screen name="(scen)/AddControllersToScenarii" />
          <Stack.Screen name="(scen)/AddSpecificController" />
        </Stack>
        <StatusBar style="auto" />
      </SocketContext.Provider>
    );
  }
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