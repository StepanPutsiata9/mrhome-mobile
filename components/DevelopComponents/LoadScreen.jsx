import { StyleSheet } from 'react-native';
import { View, Text, ActivityIndicator, ImageBackground } from 'react-native';
import SvgComponentLogo from "./PhotosComponents/LogoSVG"
export default function LoadScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/Background.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.loadingView}>
        <SvgComponentLogo />
        <Text style={styles.name}>Умный дом</Text>
        <LoadingSpinner />
      </View>
    </ImageBackground>
  );
}
const LoadingSpinner = () => {
  return (
    <View>
      <ActivityIndicator
        size="50"
        color="#4C82FF"
        animating={true}
      />
      <Text style={styles.loadText}>Загрузка...</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 104,
    height: 104,
    marginBottom: 15
  },
  name: {
    fontSize: 26,
    fontFamily: 'Roboto-Regular',
    color: '#4C82FF',
    marginBottom: 30,
    marginTop: 30,
    fontWeight: 700
  },
  loadText: {
    fontSize: 18,
    color: '#4C82FF',
    fontWeight: 400,
    marginTop: 20,
    fontFamily: 'Roboto-Regular',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
});

