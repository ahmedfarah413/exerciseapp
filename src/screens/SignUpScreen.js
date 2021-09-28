import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    Platform,
    StatusBar,
    SafeAreaView,
    ScrollView
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { signUp } from "../firebase/authMethods"

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

function SignUpScreen({ navigation }) {
    const [name, setname] = useState("")
    const [username, setusername] = useState("")
    const [mail, setmail] = useState("")
    const [mobile, setmobile] = useState("")
    const [pass, setpass] = useState("");
    const [confirmPass, setconfirmPass] = useState("")
    const [hide, sethide] = useState(true);
    const [hide1, sethide1] = useState(true);
    const [visible, setvisible] = useState(false)

    const managePasswordVisibility = () => {
        sethide(!hide);
    }

    const managePasswordVisibility1 = () => {
        sethide1(!hide1);
    }

    const validateEmail = () => {
        var re = /^[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,7}$/;
        return re.test(mail);
    };

    const signUpPressed = async () => {
        let validMail=validateEmail()
        if(!validMail){
            alert('Please Enter a valid Email.');
            return
          }
        if (mail && pass && mobile && name && confirmPass !== "") {
            if (pass == confirmPass) {
                if (pass.length >= 7) {
                    setvisible(true);
                    await signUp(username, mail, pass, name, mobile).then(() => {
                        setvisible(false);
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomeScreen' }]
                        })
                    }).catch((error) => {
                        setvisible(false);
                        console.log("error", error)
                        if (error.code === 'auth/email-already-in-use') {
                            alert('That email address is already in use!');
                        } else if (error.code === 'auth/invalid-email') {
                            alert('That email address is invalid!');
                        } else {
                            alert('Unknown error occurred.');
                        }
                    })
                } else {
                    alert('Passwords length must be atleast 8');
                }
            } else {
                alert('Passwords are not Matching');
            }
        } else {
            alert('Some Fields Are Missing');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ marginTop: '10%' }}>
                <Text style={[styles.login, styles.shadowText,]}>
                    Welcome to<Text style={{ ...styles.login, color: "#f7f7f7" }}> Auth Application</Text>
                </Text>
            </View>
            <Text style={{ ...styles.login, marginBottom: '5%', color: "#000", fontSize: 30 }}>Sign Up</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Name"
                        value={name}
                        onChangeText={(text) => setname(text)}
                    />
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="UserName"
                        onChangeText={text => setusername(text)}
                        value={username}
                    />
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Email Address"
                        value={mail}
                        onChangeText={(text) => setmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        placeholder="Mobile Number"
                        keyboardType="phone-pad"
                        onChangeText={text => setmobile(text)}
                        value={mobile}
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
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={{ ...styles.input, borderWidth: 0, padding: 0, width: '90%', marginTop: 1 }}
                            placeholder="Re-Enter Password"
                            secureTextEntry={hide1}
                            keyboardType="default"
                            value={confirmPass}
                            onChangeText={(text) => setconfirmPass(text)}
                        />
                        <TouchableOpacity onPress={managePasswordVisibility1}>
                            <Ionicons name={(hide1) ? "eye-sharp" : "eye-off-sharp"} size={23} color="black" />
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
                                onPress={signUpPressed}
                                activeOpacity={0.9}
                            >
                                <Text style={{ color: "#ffffff", fontSize: 18, fontWeight: "bold" }}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
                <View style={styles.bottom}>
                    <Text
                        style={{ ...styles.login, color: "#fff", marginHorizontal: 15, fontSize: 16 }}>
                        Already have an account?
                    </Text>
                    <Text
                        onPress={() => navigation.navigate("LoginScreen")}
                        style={{
                            ...styles.login,
                            color: '#fff',
                            textDecorationLine: "underline",
                            fontWeight: "bold",
                            fontSize: 16
                        }}>
                        Login
                    </Text>
                </View>
            </ScrollView>
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
        marginTop: "5%",
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
export default SignUpScreen;