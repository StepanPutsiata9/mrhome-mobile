import { StyleSheet, Text, ScrollView, ImageBackground } from 'react-native';
import { Header } from "../../components/DevelopComponents/Header";
import Category from "../../components/DevelopComponents/Category/Category";
import { useContext } from 'react';
import { SocketContext } from '../_layout';
import { AuthContext } from '../../Auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { socket, data } = useContext(SocketContext);
  const { user } = useContext(AuthContext);

  // console.log('SocketContext data:', data);
  // console.log('====================================');
  // console.log("Socket: ", socket.current);
  // console.log('====================================');

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <Header/>
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <ScrollView>
        <Text style={styles.myGadgets}>Мои устройства</Text>
        <Category
          titleOfCategory={"Электронные устройства"}
          data={data.electro}
          socket={socket}
        />
        <Category
          titleOfCategory={"Датчики"}
          data={data.sensors}
          socket={socket}
        />
      </ScrollView>
      {/* </SafeAreaView> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  myGadgets: {
    paddingHorizontal: 20,
    fontSize: 28,
    fontWeight: '700',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});