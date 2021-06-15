import React,{useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button, Input} from "react-native-elements"
import Icon from "react-native-vector-icons/FontAwesome"
import { db } from '../firebase'
const AddChatScreen = ({navigation}) => {
    const [input,setInput]  = useState("")
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title:"Add new Chat",
            headerBackTitle:"Chats"
        })
    }, [navigation])

    const createChat = async ()=>{
        await db.collection("chats").add({
            chatName: input
        }).then(()=>{
            navigation.goBack()
        }).catch(error => alert(error))
    }

    return (
        <View
        style={styles.container}
        >
            <Input
            placeholder="Enter Chat Name"
            onSubmitEditing={createChat}
            value={input}
            onChangeText={(text)=>setInput(text)}
            leftIcon={
                <Icon size={24} type="antdesgin" name="wechat" color="black"/>
            }
            />
            <Button onPress={createChat} title = "New Chat"/>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%"
    }
})
