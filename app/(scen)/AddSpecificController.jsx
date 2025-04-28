import { useLocalSearchParams } from "expo-router";
import { View,Text} from "react-native";
import AddCurtain from "./AddedDevices/AddCurtain"
import AddSwitch from "./AddedDevices/AddSwitch"
import AddLight from "./AddedDevices/AddLight"


export default function AddSpecificController(){
    const controller=useLocalSearchParams();
    switch(controller.deviceType){
        case "curtain":
            return <AddCurtain/>;
        case "switch":
            return <AddSwitch/>;
        case "light":
            return <AddLight/>;
    }
}