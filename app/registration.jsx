import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Animated, Pressable } from 'react-native';
import { AuthContext } from '../Auth/AuthContext';
import api from '../Auth/api';
import { Header } from '@/components/DevelopComponents/Header';
import EyeOpen from "../components/DevelopComponents/PhotosComponents/EyeOpen"
import EyeClosed from "../components/DevelopComponents/PhotosComponents/EyeClosed"
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const RegistrationScreen = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [broker, setBroker] = useState('');
  const [ws, setWs] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
 const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (error) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [error]);
  const handleRegistration = async () => {
    setLoading(true);
    setError('');
    if (loginInput.trim().length === 0 || password.trim().length === 0
      || broker.trim().length === 0 || ws.trim().length === 0
    ) {
      setError("Все поля должны быть заполненными");
      setLoading(false);
      return;
    }
    if (loginInput.trim().length <= 6 || password.trim().length <= 6) {
      setError("Логин и пароль должны состоять минимум из 6 символов");
      setLoading(false);
      return;
    }
    try {
      const response = await api.post('/register', { username: loginInput, password, url: broker, port: ws });
      const { accessToken, refreshToken } = response.data;
      console.log('====================================');
      console.log(accessToken, "/", refreshToken);
      console.log('====================================');
      login(accessToken, refreshToken);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ backgroundColor: 'white', }}>
      {/* <SafeAreaView> */}
      <Header />
      <View style={styles.conatiner}>
        <Text style={styles.regist}>Регистрация</Text>
        <TextInput
          value={loginInput}
          placeholder='Логин'
          style={styles.input}
          onChangeText={setLoginInput}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"

        />
        <View style={styles.inputView}>
          <TextInput
            value={password}
            placeholder='Пароль'
            style={styles.input}
            onChangeText={setPassword}
            secureTextEntry={isVisible}
            placeholderTextColor="#999"
          />
          <View style={styles.eye}>
            <Pressable onPress={() => setIsVisible(!isVisible)}>
              {!isVisible ? <EyeOpen /> : <EyeClosed />}
            </Pressable>
          </View>
        </View>
        <TextInput
          value={broker}
          placeholder='Адрес брокера'
          style={styles.input}
          onChangeText={setBroker}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        <TextInput
          value={ws}
          placeholder='WebSocket-порт'
          style={styles.input}
          onChangeText={setWs}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        {error ? (
          <Animated.View style={{ opacity: fadeAnim, marginTop: -5 }}>
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        ) : null}

        <TouchableOpacity onPress={() => {
          router.push('/')
        }}>
          <Text style={styles.link}>Есть аккаунт? Войти</Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator />
        ) : (<LinearGradient
          colors={['#195dfc', '#4C82FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBtn}
        >
          <TouchableOpacity
            style={styles.logBtn}
            activeOpacity={0.7}
            onPress={handleRegistration}
          >
            <Text style={styles.btnText}>Зарегистрироваться</Text>
          </TouchableOpacity>
        </LinearGradient>
        )}
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
};
const styles = StyleSheet.create({
  conatiner: {
    paddingHorizontal: 20,
    height: "100%"
  },
  regist: {
    fontSize: 28,
    fontFamily: 'Roboto',
    marginTop: 10,
    marginBottom: 10
  },

  link: {
    color: '#4C82FF',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 15
  },
  logBtn: {
    borderRadius: 16,
    paddingHorizontal: 60,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
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
  btnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#ECEEF4',
    color: '#8B8B8B'
  },
  eye: {
    position: 'absolute',
    right: 13,
    top: 13
  },
  inputView: {
    position: 'relative'
  },
   errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'left',
    marginBottom: 15,
    paddingVertical: 3,

  },
});

export default RegistrationScreen;