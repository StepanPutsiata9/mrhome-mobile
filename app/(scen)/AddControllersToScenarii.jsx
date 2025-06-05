
import { StyleSheet, View, Pressable, ScrollView, Text } from 'react-native';
import { Header } from "../../components/DevelopComponents/Header"
import ToArrow from "../../components/DevelopComponents/PhotosComponents/toArrow"
import Back from "../../components/DevelopComponents/PhotosComponents/Back"

import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { SocketContext } from '../_layout';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function AddControllersToScenarii() {
  const router = useRouter();
  const { data, socket } = useContext(SocketContext);
  function extractElectroDevices(data) {
    if (!data || !data.electro || !Array.isArray(data.electro)) {
      return [];
    }
    return data.electro.map(device => ({
      title: device.payload.title || 'Название не указано',
      deviceType: device.payload.deviceType || 'Тип не указан',
      deviceId: device.payload.deviceId,
    }));
  }
  const electroList = extractElectroDevices(data);
  return (
    // <SafeAreaView style={{ flex: '1' ,backgroundColor: 'white',height:'100%'}}>
    <View style={{ flex: '1', backgroundColor: 'white', height: '100%' }}>
      <Header />
      <ScrollView >
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Новый сценарий</Text>
            <Pressable onPress={() => router.back()}>
              <Back />
            </Pressable>
          </View>
          <View>
            {electroList.length !== 0 ?
              electroList.map((item, key) => {
                return (
                  <View key={key} >
                    <Pressable style={{
                      flexDirection: 'row', justifyContent: 'space-between',
                      marginBottom: 20,
                    }} onPress={() => {
                      router.push({
                        pathname: "/(scen)/AddSpecificController",
                        params: item,
                      })
                    }}>
                      <Text style={{}}>{item.title}</Text>
                      <ToArrow />
                    </Pressable>
                  </View>
                )
              })
              :
              <Text style={styles.emptyList}>Нет приборов для добавления в сценарий...</Text>
            }
          </View>
        </View>
      </ScrollView>
    </View>

    /* </SafeAreaView> */
  )
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    // height:'100%'
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 20,
  },
  emptyList: {
    marginHorizontal: 'auto',
    color: '#8b8b8b',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 300,
  }

});
