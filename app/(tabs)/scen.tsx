import { StyleSheet,View,Text,ImageBackground} from 'react-native';
import {Header} from "../../components/DevelopComponents/Header"

import Scenarii from "../../components/DevelopComponents/Scenarii/Scenarii"
import { useLocalSearchParams } from 'expo-router';
export default function TabTwoScreen() {

  const {socket}=useLocalSearchParams();
  return (
  <ImageBackground
        source={require('../../assets/images/Background.png')} 
              style={styles.background}
              resizeMode="cover"
        >
    <View>
      <Header/>
      <Scenarii socket={socket}/>
    </View>
  </ImageBackground>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex:0,
  },
});
