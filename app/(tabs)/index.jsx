import {  StyleSheet ,Text, ScrollView,ImageBackground} from 'react-native';
import {Header} from "../../components/DevelopComponents/Header"
import Category from "../../components/DevelopComponents/Category/Category"
import { useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {

  const {data,socket}=useLocalSearchParams();
  
  return (
    <ImageBackground
    source={require('../../assets/images/Background.png')} 
          style={styles.background}
          resizeMode="cover"
    >
      <ScrollView>
          <Header/>
          <Text style={styles.myGadgets}>Мои устройства</Text>
          <Category titleOfCategory={"Электронные устройства"} data={data.electro} socket={socket}/>
          <Category titleOfCategory={"Датчики"} data={data.sensors} socket={socket}/>
      </ScrollView>
    </ImageBackground>
  
  );
}

const styles = StyleSheet.create({
  myGadgets:{
    marginLeft:20,
    fontSize:18,
    fontWeight:700,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex:0,
  },
});
