import { StyleSheet, View, ImageBackground, ScrollView, Pressable, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Header } from "../../components/DevelopComponents/Header"
import Scenarii from "../../components/DevelopComponents/Scenarii/Scenarii"
import { useRouter } from 'expo-router';
import Plus from "../../components/DevelopComponents/PhotosComponents/Plus"
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../_layout';
import { ScenariiContext } from '../(scen)/ScenariiContext';
import axios from "axios"

export default function TabTwoScreen() {
  const { socket, data } = useContext(SocketContext);
  const router = useRouter();
  const { scenariiState,setScenariiState } = useContext(ScenariiContext);
  const [loading, setLoading] = useState(null);
  const api = axios.create({
    baseURL: 'http://testyandex.onrender.com/',
  });
  useEffect(() => {
    const fetchScen = async () => {
      setLoading(true);
      // fetch scen
      const data = api.get("/scenarios/all");
      const response=await data.response;
      setLoading(false);
      // setScenariiState(response);
    }
    fetchScen();
  }, [])
  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView style={styles.scrollView}>
        <Header />
        {!loading
          ?
          <View style={styles.container}>
            <Text style={styles.scenText}>Сценарии</Text>
            {scenariiState.length != 0 ? (
              scenariiState.map((item, index) => (
                <Scenarii item={item} key={index} />
              ))
            ) : (
              <View style={styles.emptyScenView}>
                <Text style={styles.emptyScen}>Сценариев пока нет...</Text>
              </View>
            )}
          </View>
          :
          <View style={styles.loadingView}>
            <ActivityIndicator size={70} color={"#4C82FF"} />
            <Text style={styles.loadScen}>Загрузка сценариев...</Text>
          </View>
        }
      </ScrollView>


      {!loading && <TouchableOpacity
        style={styles.plusContainer}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => router.push('/(scen)/NewScenarii')}
      >
        <View style={styles.plus}>
          <Plus />
        </View>
      </TouchableOpacity>
      }
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  scenText: {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: 1,
  },
  plusContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10,
  },
  plus: {
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#4C82FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyScen: {
    color: '#8b8b8b',
    fontSize: 16,
  },
  emptyScenView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: "70%",
  },
  loadingView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginTop: "70%",
  },
  loadScen: {
    color: '#4C82FF',
    fontWeight: '600',
    fontSize: 20,
  }
});