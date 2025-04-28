import { StyleSheet,View,ImageBackground,ScrollView, Text} from 'react-native';
import {Header} from "../../components/DevelopComponents/Header"
import Scenarii from "../../components/DevelopComponents/Scenarii/Scenarii"
import {useRouter } from 'expo-router';
import Plus from "../../components/DevelopComponents/PhotosComponents/Plus"
import { useContext } from 'react';
import { SocketContext } from '../_layout';
export default function NewScen() {

  const {socket,data}=useContext(SocketContext);
  const router=useRouter();
  return (
 
    <ScrollView>
      <Header/>
      <Text>New Scen</Text> 
    </ScrollView>
    
  
    

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
  plus:{
      position:'absolute',
      
      right:20,
      bottom:20,
      zIndex:2,
      width:50,
      height:50,
      borderRadius:'50%',
      backgroundColor:'#4C82FF',
      alignItems:'center',
      justifyContent:'center'
  },
});
