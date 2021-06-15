import React, { useState } from 'react'
import {StyleSheet,KeyboardAvoidingView, View,  } from 'react-native'
import {Button,Input,Image,Text} from "react-native-elements"
import {auth}  from "../firebase"
const RegisterScreen = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [imageUrl,setImageUrl] = useState("https://chee.engineering.arizona.edu/sites/chee.engineering.arizona.edu/files/styles/large/public/images/people/_field.jpg?itok=SAf-7onI")

    const register = () => {
       auth.createUserWithEmailAndPassword(email,password)
       .then((authUser)=>{
           console.log(authUser)
           authUser.user.updateProfile({
               displayName:name,
               photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",

           })
       }).catch(error => alert(error.message))
    }
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text h3 style={{marginBottom:50}} >
                Create a Signal account
            </Text>

            <View style={styles.input}>
                <Input
                placeholder="Full name"
                autoFocus
                value={name}
                onChangeText={text=>setName(text)}
                />
                 <Input
                placeholder="Email"
                type="email"
                value={email}
                onChangeText={text=>setEmail(text)}
                />
                
                <Input
                placeholder="Password"
                secureTextEntry
                type="password"
                value={password}
                onChangeText={text=>setPassword(text)}
                />
                
                <Input
                placeholder="Profile Pic url (optional)"
                type="text"
                value={imageUrl}
                onSubmitEditing={register}
                onChangeText={text=>setImageUrl(text)}
                />
                
                
            </View>
            <Button
            containerStyle={styles.buttton}
            raised
            onPress={register}
            title="Register"
            />
            <View style={{height:100}}/>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    input:{
        width:300,
    },
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:10,
        backgroundColor:"white"
    },
    buttton:{
        width:200,
        marginTop:10
    }
})


export default RegisterScreen
