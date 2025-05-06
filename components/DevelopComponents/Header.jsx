import { View, Text, StyleSheet,Platform} from "react-native"
import LogoSmall from "./PhotosComponents/LogoSmallSvg"

export function Header() {
    return (
        <View style={Platform.OS !== 'ios'?styles.header:styles.headerIOS}>
            <View>
                <LogoSmall />
            </View>
            <View>
                <Text style={styles.headerText} >Умный дом</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop:0,
        marginBottom: 10,
    },
    headerIOS:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        marginBottom: 10,
    },
    headerText: {
        color: "#4C82FF",
        fontSize: 24,
        fontWeight: 700,
        fontFamily: "Roboto",
    }
});
