import { useContext, useState } from "react";
import { View,Text,TextInput,Button} from "react-native";
import {AuthContext} from "../../../app/_layout"
export default function Login(){
    const [login,setLogin]=useState("");
    const [password,setPassword]=useState("");

    const {updateAuthValues}=useContext(AuthContext);
    const handleButton = (login,password) => {
       updateAuthValues(login,password)
      };
    return(
        <View>
            <Text>Регистрация</Text>
            <View>
            <TextInput
                placeholder="Login"
                value={login}
                onChangeText={setLogin}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Войти" onPress={()=>handleButton(login,password)} />
            </View>
        </View>
    )
}