import { View, Text, StyleSheet, Platform } from "react-native"
import LogoSmall from "./PhotosComponents/LogoSmallSvg"
import { SafeAreaView } from "react-native-safe-area-context";

export function Header() {
    return (
        <SafeAreaView style={{}}>
        <View style={styles.header}>
            <View>
                <LogoSmall />
            </View>
            <View>
                <Text style={styles.headerText}>Умный дом</Text>
            </View>
        </View>
        </SafeAreaView>
       

    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        // paddingTop: 50,
        // marginBottom: 30,
    },
    headerText: {
        color: "#4C82FF",
        fontSize: 24,
        fontWeight: 700,
        fontFamily: "Roboto",
    }
});
