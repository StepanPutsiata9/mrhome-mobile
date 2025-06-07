import { StyleSheet, View, ImageBackground, ScrollView, Pressable, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { Header } from "../../components/DevelopComponents/Header"
import Scenarii from "../../components/DevelopComponents/Scenarii/Scenarii"
import { useRouter } from 'expo-router';
import Plus from "../../components/DevelopComponents/PhotosComponents/Plus"
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../_layout';
import { ScenariiContext } from '../(scen)/ScenariiContext';
import axios from "axios"
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from '@/Auth/AuthContext';
import scenariiApi from "../(scen)/apiScenarios"
import { getTokens } from '@/Auth/authStorage';
export default function TabTwoScreen() {
  const { socket, data } = useContext(SocketContext);
  const {loading,setLoading}=useContext(ScenariiContext)

  const router = useRouter();
  const { scenariiState, setScenariiState } = useContext(ScenariiContext);

  const insets = useSafeAreaInsets();
  useEffect(() => {
    const fetchScen = async () => {

      try {
        setLoading(true);
        // const tokens = await getTokens();
        const response = await scenariiApi.get("all/");
        setScenariiState(response.data.scenarios);
      } catch (error) {
        console.error(
          "Ошибка:",
          error.response?.data || error.message
        );
        if (error.response?.status === 401) {
          console.log("Токен недействителен и не удалось обновить, перенаправляем на логин...");
        }
      }finally{
        setLoading(false);
      }
    };
    fetchScen();
  }, []);
  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* <SafeAreaView style={{ flex: 1 }}> */}
      <Header />
      <ScrollView style={styles.scrollView}>
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
      {!loading && (
        <View style={[styles.plusContainer, { bottom: insets.bottom + 60 }]}>
          <LinearGradient
            colors={['#195dfc', '#4C82FF']}
            style={styles.gradientBtn}
          >
            <TouchableOpacity
              style={styles.plus}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
              onPress={() => router.push('/(scen)/NewScenarii')}
            >
              <Plus />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      )}
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingBottom:100,

  },
  scrollView: {
    flex: 1,
  },
  gradientBtn: {
    borderRadius: 16,
    shadowColor: '#4C82FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
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
  gradientBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4C82FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  plus: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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