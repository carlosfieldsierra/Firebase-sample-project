import React,{useState,useEffect} from 'react'
import { KeyboardAvoidingView,StyleSheet,View, Text } from 'react-native'
import {Button,Input,Image} from "react-native-elements"
import {StatusBar} from "expo-status-bar"
import { auth } from "../firebase"

const LoginScreen = (props) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    
    // 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                props.navigation.navigate("Home")
            }
        })
        return unsubscribe
    }, [])
    const signIn = () => {
        auth.signInWithEmailAndPassword(email,password).catch(error => alert(error))
    }


    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Image
            source={{
                uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
            }}
            style={{width:200,height:200}}
            />
            <View style={styles.inputContainer}>
                <Input autoFocus placeholder="Email" type="email" value={email}
                onChangeText={text=>setEmail(text)}
                />
                <Input placeholder="Password"  type="password"
                secureTextEntry
                value={password}
                onSubmitEditing={signIn}
                onChangeText={text=>setPassword(text)}
                />
            </View>

            <Button containerStyle={styles.button} onPress={signIn} title="Login"/>
            <Button containerStyle={styles.button}  onPress={()=>{props.navigation.navigate("Register")}} title="Register" type="outline"/>
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        width:300,
        marginTop:10,
    },
    button:{
        width:200,
        marginTop:10,
    },
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        backgroundColor:"white"
    }
})


export default LoginScreen
