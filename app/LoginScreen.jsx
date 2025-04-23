import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator,StyleSheet, Pressable } from 'react-native';
import { AuthContext}  from '../Auth/AuthContext';
import api from '../Auth/api';
import { useContext } from 'react';
import { Header } from '../components/DevelopComponents/Header';
import EyeOpen from "../components/DevelopComponents/PhotosComponents/EyeOpen"
import EyeClosed from "../components/DevelopComponents/PhotosComponents/EyeClosed"

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
    const [isVisible,setIsVisible]=useState(false);
  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      const { accessToken, refreshToken } = response.data;
      login(accessToken, refreshToken);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
        <Header/>
        <View style={styles.conatiner}>
        <Text style={styles.enter}>Войти</Text>
        <TextInput
            value={email}
            placeholder='Логин'
            style={styles.input}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
        />
      
     <View style={styles.inputView}>
     <TextInput
        value={password}
        placeholder='Пароль'
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={!isVisible}
      />
      <View style={styles.eye}>
        <Pressable onPress={()=>setIsVisible(!isVisible)}>
            {!isVisible?<EyeOpen/>:<EyeClosed/>}
        </Pressable>
      </View>
     </View>
      
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      
      <TouchableOpacity onPress={() => {
         router.push({
            pathname: '/Registr',
          
        })
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
        padding:20
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