import { StyleSheet, View, ImageBackground, ScrollView, Pressable, Text, TouchableOpacity, Modal } from 'react-native';
import { Header } from "../../components/DevelopComponents/Header"
import Scenarii from "../../components/DevelopComponents/Scenarii/Scenarii"
import { useRouter } from 'expo-router';
import Plus from "../../components/DevelopComponents/PhotosComponents/Plus"
import { useContext } from 'react';
import { SocketContext } from '../_layout';
import { ScenariiContext } from '../(scen)/ScenariiContext';

export default function TabTwoScreen() {
  const { socket, data } = useContext(SocketContext);
  const router = useRouter();
  const { scenariiState } = useContext(ScenariiContext);

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView style={styles.scrollView}>
        <Header />
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
      </ScrollView>


      <TouchableOpacity
        style={styles.plusContainer}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => router.push('/(scen)/NewScenarii')}
      >
        <View style={styles.plus}>
          <Plus />
        </View>
      </TouchableOpacity>
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
    paddingTop:50,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 80, 
  },
  scenText: {
    fontSize: 28,
    fontWeight:700,
    letterSpacing:1,
  },
  plusContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 10, 
  },
  plus: {
    width: 50,
    height: 50,
    borderRadius: 25, 
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
    marginTop: 40,
  },
});