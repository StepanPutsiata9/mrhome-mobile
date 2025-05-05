import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import Light from "../PhotosComponents/Light"
import Snickers from "../PhotosComponents/Snickers"
import Temp from "../PhotosComponents/Temp"
import Shtora from "../PhotosComponents/Shtora"
import SwitchOutline from "../PhotosComponents/SwitchOutline"
export default function ControllerItem({ data,socket }) {
  let photo;
  switch(data.title){
    case "Умная подсветка":
      photo = <Light color={"#4C82FF"} />
      break;
    case "Умный выключатель":
      photo = <SwitchOutline color={"#4C82FF"} />
      break;
    case "Умная роль-штора":
      photo = <Shtora color={"#4C82FF"} />
      break;
    case "Датчик температуры":
      photo = <Temp color={"#4C82FF"} />  
      break;
    case "Датчик движения":
      photo = <Snickers color={"#4C82FF"} />
      break;
  }
  // switch(data.deviceType){
  //   case "Умная подсветка":
  //     photo = <Light color={"#4C82FF"} />
  //     break;
  //   case "Умный выключатель":
  //     photo = <SwitchOutline color={"#4C82FF"} />
  //     break;
  //   case "Умная роль-штора":
  //     photo = <Shtora color={"#4C82FF"} />
  //     break;
  //   case "temp":
  //     photo = <Temp color={"#4C82FF"} />  
  //     break;
  //   case "move":
  //     photo = <Snickers color={"#4C82FF"} />
  //     break;
  // }
 
    // EXMPL FOR SEND DEVICE 
  // {
  //   "deviceId": "curtain1",
  //   "deviceType": "curtain",
  //   "command": "set_position",
  //   "params": {
  //     "position": 80
  //   }
  // }

  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: '/controllerInfo',
          params:{
            id:data.id,
          } ,
        });
      }}
    >
      <View style={styles.controllerItem}>
        <View style={styles.titleBlock}>
          {photo}
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.infoBlock}>
        <Text style={styles.status}>Статус</Text>
        <Text style={styles.online}>{data.state}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  controllerItem: {
    width: "100%",
    height: 97,
    padding: 15,
    marginVertical: 10,
    borderRadius: 16,
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleBlock: {
    flex: 1,
    flexDirection: "row",

  },
  title: {
    fontSize: 13,
    fontWeight: 500,
    fontFamily: "Roboto",
    marginLeft: 10,
    width:90,
  },
  infoBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems:'center',
    marginBottom: -10
  },
  status: {
    fontSize: 12,
    fontFamily: "Roboto",
  },
  online: {
    color: "#8B8B8B",
    fontSize: 12,
    fontFamily: "Roboto",

  },
  statusView: {
    maxWidth: 75,
    paddingHorizontal:10,

  },
  onlineCircle:{
    width:20,
    height:20,
    borderRadius:"50%",
    backgroundColor:"#4C82FF",
    boxShadow: "0 0 15px 5px rgba(76, 130, 255, 0.9)"
  },
  offlineCircle:{
    width:20,
    height:20,
    borderRadius:"50%",
    backgroundColor:"#8b8b8b",
    boxShadow: "0 0 10px 3px rgba(139, 139, 139, 0.7)"
  },
});
