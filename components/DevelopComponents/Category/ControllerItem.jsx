import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from 'expo-router';
import Light from "../PhotosComponents/Light"
import Snickers from "../PhotosComponents/Snickers"
import Temp from "../PhotosComponents/Temp"
import Shtora from "../PhotosComponents/Shtora"
import SwitchOutline from "../PhotosComponents/SwitchOutline"
export default function ControllerItem({ data,socket }) {
  let photo;

  if (data.title == "Умная подсветка") {
    photo = <Light color={"#4C82FF"} />

  } else if (data.title == "Умный выключатель") {
    photo = <SwitchOutline color={"#4C82FF"} />

  } else if (data.title == "Умная роль-штора") {
    photo = <Shtora color={"#4C82FF"} />

  } else if (data.title == "Датчик температуры") {
    photo = <Temp color={"#4C82FF"} />

  } else if (data.title == "Датчик движения") {
    photo = <Snickers color={"#4C82FF"} />
  }
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
          <View style={styles.statusView}>
            {/* <Text style={styles.status}>{data.isOnline?"В сети":"Не в сети"}</Text> */}
          </View>
          <Text style={styles.online}>{data.state}</Text>
        </View>
      </View>
    </TouchableOpacity>

  )
};

const styles = StyleSheet.create({
  controllerItem: {
    width: 150,
    height: 97,
    padding: 15,
    marginHorizontal: 15,
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
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "Roboto",
    marginLeft: 9,
    marginRight: 16

  },
  infoBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: -20
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

  }
});
