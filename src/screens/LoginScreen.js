import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { logIn } from "../firebase/authMethods"

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

function LoginScreen({ navigation }) {
  const [mail, setmail] = useState(undefined);
  const [pass, setpass] = useState(undefined);
  const [hide, sethide] = useState(true);
  const [visible, setvisible] = useState(false)

  const managePasswordVisibility = () => {
    sethide(!hide);
  }

  const validateEmail = () => {
    var re = /^[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,7}$/;
    return re.test(mail);
  };

  const handlePress = async () => {
    if (!mail && !pass) {
      Alert.alert('Email and password is required.');
      return
    }
    if (!mail) {
      Alert.alert('Email field is required.');
      return
    }
    if (!pass) {
      Alert.alert('Password field is required.');
      return
    }
    let validMail=validateEmail()
    if(!validMail){
      Alert.alert('Please Enter a valid Email.');
      return
    }
    if (mail && pass) {
      setvisible(true)
      await logIn(mail, pass).then(() => {
        setvisible(false)
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }]
        })
      }).catch((error) => {
        setvisible(false)
        alert(error)
      })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: '20%' }}>
        <Text style={[styles.login, styles.shadowText,]}>
          Welcome to<Text style={{ ...styles.login, color: "#f7f7f7" }}> Auth Application</Text>
        </Text>
      </View>
      <Text style={{ ...styles.login, color: "#000", fontSize: 30 }}>Log In</Text>
      <View style={{ ...styles.form, marginTop: '15%' }}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="Email Address"
          value={mail}
          onChangeText={(text) => setmail(text)}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={{
              ...styles.input,
              borderWidth: 0,
              padding: 0,
              width: "90%",
              marginTop: 0,
            }}
            placeholder="Password"
            secureTextEntry={hide}
            keyboardType="default"
            value={pass}
            onChangeText={(text) => setpass(text)}
          />

          <TouchableOpacity onPress={() => managePasswordVisibility()}>
            <Ionicons name={hide ? "eye-sharp" : "eye-off-sharp"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderRadius: 14,
            padding: 16,
            backgroundColor: "#000",
            marginTop: "10%",
            alignItems: 'center'
          }}
        >
          {visible ? (
            <ActivityIndicator visible={visible} color="#fff" size="small" />
          ) : (
            <TouchableOpacity
              style={{ width: '100%', alignItems: "center" }}
              onPress={handlePress}
              activeOpacity={0.9}
            >
              <Text
                style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold" }}
              > Log in
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.bottom}>
        <Text
          style={{ ...styles.login, color: "#fff", marginHorizontal: 15, fontSize: 16 }}>
          Don't have an account?
        </Text>
        <Text
          onPress={() => navigation.navigate("SignUpScreen")}
          style={{
            ...styles.login,
            color: '#fff',
            textDecorationLine: "underline",
            fontWeight: "bold",
            fontSize: 16
          }}>
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: '#2C5163',
    flex: 1
  },

  image: {
    height: HEIGHT / 8,
    width: WIDTH / 3.3,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 30,
  },
  login: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
    marginTop: 20,
  },
  input: {
    fontSize: 14,
    padding: 16,
    borderRadius: 14,
    borderColor: "#A3A4AA",
    borderWidth: 0.5,
    backgroundColor: '#f7f7f7',
    marginTop: "6.5%",
  },
  form: {
    marginHorizontal: "5%",
    marginTop: "6%",
  },
  bottom: {
    justifyContent: "center",
    flexDirection: "row",
  },
  passwordContainer: {
    width: "100%",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#A3A4AA",
    paddingHorizontal: 20,
    marginTop: 20,
    borderWidth: 0.5,
    backgroundColor: '#f7f7f7'
  },
  shadowText: {
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowOffset: { width: 0, height: 1 },
    shadowColor: '#000'
  },
});


export default LoginScreen;