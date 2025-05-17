import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator,StyleSheet, Pressable } from 'react-native';
import { AuthContext}  from '../Auth/AuthContext';
import api from '../Auth/api';
import { useContext } from 'react';
import { Header } from '../components/DevelopComponents/Header';
import EyeOpen from "../components/DevelopComponents/PhotosComponents/EyeOpen"
import EyeClosed from "../components/DevelopComponents/PhotosComponents/EyeClosed"
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    
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
    <View style={{backgroundColor:'white',}}>
        <Header/>
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
        <Pressable onPress={()=>setIsVisible(!isVisible)}>
            {isVisible?<EyeOpen/>:<EyeClosed/>}
        </Pressable>
      </View>
     </View>
      
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      
      <TouchableOpacity onPress={() => {
         router.push('/registration')
      }}>
        <Text style={styles.link}>Нет аккаунта? Зарегистрироваться</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator />
      ) : (<TouchableOpacity
                style={styles.logBtn}
                activeOpacity={0.7}
                onPress={handleLogin}>
            <Text style={styles.btnText}>Войти</Text>
            </TouchableOpacity>
      )}
    </View>
    </View>
  );
};
const styles = StyleSheet.create({
    conatiner:{
        padding:20,
        height:"100%",

    },
    enter:{
        fontSize:30,
        fontFamily:'Roboto',
        marginTop:10,
        marginBottom:10
    },
    logBtn:{
        borderRadius:16,
        backgroundColor:'#4C82FF',
        paddingHorizontal:60,
        paddingVertical:10,
      },
    link:{
        color:'#4C82FF',
        fontSize:14,
        textAlign:'right',
        marginBottom:15
      },
      btnText:{
        color:'white',
        fontSize:20,    
        margin:'auto'
      },
      input: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom:15,
        fontSize: 16,
        backgroundColor: '#ECEEF4',
        color:'#8B8B8B'
      },
      eye:{
        position:'absolute',
        right:13,
        top:13
    },
    inputView:{
        position:'relative'
    }
});

export default LoginScreen;