import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import AddCurtain from "./AddedDevices/AddCurtain"
import AddSwitch from "./AddedDevices/AddSwitch"
import AddLight from "./AddedDevices/AddLight"


export default function AddSpecificController() {
    const controller = useLocalSearchParams();
    switch (controller.deviceType) {
        case "curtain":
            return <AddCurtain controller={controller} />;
        case "switch":
            return <AddSwitch controller={controller} />;
        case "light":
            return <AddLight controller={controller} />;
    }
}