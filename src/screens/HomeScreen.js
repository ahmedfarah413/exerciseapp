import React from 'react'
import { SafeAreaView,StyleSheet,StatusBar, Text, View } from 'react-native'


export default function HomeScreen({navigation}) {
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{paddingVertical:10,borderBottomWidth:0.5}}>
                <Text style={{fontSize:20,color:"#f7f7f7",fontWeight:'bold',alignSelf:'center'}}>Home Screen</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#2C5163',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})
