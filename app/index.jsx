import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Animated, Pressable } from 'react-native';
import { AuthContext } from '../Auth/AuthContext';
import api from '../Auth/api';
import { Header } from '../components/DevelopComponents/Header';
import EyeOpen from "../components/DevelopComponents/PhotosComponents/EyeOpen"
import EyeClosed from "../components/DevelopComponents/PhotosComponents/EyeClosed"
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const { login } = useContext(AuthContext);
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
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    if(loginInput.trim().length===0||password.trim().length===0){
        setError("Все поля должны быть заполненными");
        setLoading(false);
        return;
    }
    if(loginInput.trim().length<=6||password.trim().length<=6){
        setError("Логин и пароль должны состоять минимум из 6 символов");
        setLoading(false);
        return;
    }
    try {
      const response = await api.post('/login', {
        username: loginInput,
        password: password
      });

      const { accessToken, refreshToken } = response.data;

      if (!accessToken || !refreshToken) {
        throw new Error('Не получили токены от сервера');
      }

      console.log('Пытаемся войти с токенами:', {
        access: accessToken.slice(0, 10) + '...',
        refresh: refreshToken.slice(0, 10) + '...'
      });

      await login(accessToken, refreshToken);
      router.replace('/(tabs)');

    } catch (err) {
      console.error('Ошибка входа:', err);
      setError(
        err.response?.data?.message ||
        err.message ||
        'Произошла ошибка при входе'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ backgroundColor: 'white' }}>
      {/* <SafeAreaView> */}
      <Header />
      <View style={styles.conatiner}>
        <Text style={styles.enter}>Войти</Text>
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
            secureTextEntry={!isVisible}
            placeholderTextColor="#999"

          />
          <View style={styles.eye}>
            <Pressable onPress={() => setIsVisible(!isVisible)}>
              {isVisible ? <EyeOpen /> : <EyeClosed />}
            </Pressable>
          </View>
        </View>

        {error ? (
          <Animated.View style={{ opacity: fadeAnim,marginTop:-5 }}>
            <Text style={styles.errorText}>{error}</Text>
          </Animated.View>
        ) : null}

        <TouchableOpacity onPress={() => {
          router.push('/registration')
        }}>
          <Text style={styles.link}>Нет аккаунта? Зарегистрироваться</Text>
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
            onPress={handleLogin}
          >
            <Text style={styles.btnText}>Войти</Text>
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
    height: "100%",

  },
  enter: {
    fontSize: 30,
    fontFamily: 'Roboto',
    marginTop: 10,
    marginBottom: 10
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
  link: {
    color: '#4C82FF',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 15
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

export default LoginScreen;


// #195dfc