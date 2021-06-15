import React,{useLayoutEffect, useState} from 'react'
import {TouchableWithoutFeedback,ScrollView ,TextInput,TouchableOpacity,StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Keyboard } from 'react-native'
import { Avatar, } from 'react-native-elements'
import {AntDesign,FontAwesome,Ionicons} from "@expo/vector-icons"
import { db,auth } from '../firebase'
import * as firebase from "firebase"

const ChatScreen = ({navigation,route}) => {
    const [input,setInput] = useState("")
    const [messages,setMessages] = useState([])
    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestap:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput('')
    }

    useLayoutEffect(() => {
        const unsubscribe = db
        .collection("chats")
        .doc(route.params.id)
        .collection("messages")
        .orderBy("timestap","desc")
        .onSnapshot((snapshot)=>(
            setMessages(
                snapshot.docs.map(doc=> ({
                    id:doc.id,
                    data: doc.data(),
                }))
            )
        ))

        return unsubscribe
    }, [route])



    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle:()=>(
                <View style={{flexDirection:"row",
                alignItems:"center"
                }}>
                    <Avatar rounded source={{uri:""}}/>
                    <Text style={{fontWeight:"700"}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft:()=>(
                <TouchableOpacity
                style={{marginLeft:10}}
                onPress={navigation.goBack}
                >
                    <AntDesign  name="arrowleft" size={24} color="black"/>
                </TouchableOpacity>
            ),
            headerRight:()=>(
                <View style={{
                    flexDirection:"row",
                    justifyContent:"space-between",
                    width:80,
                    marginRight:20,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24}/>
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    return (
        <SafeAreaView style={{
            flex:1,
        }}>
            <KeyboardAvoidingView
            style={styles.container}
            behavior={"padding"}
            keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView>
                            {messages.map(({id,data})=>(
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciver}>
                                        <Avatar rounded
                                        position="absolute"
                                        bottom={15}
                                        right={-5}
                                        size={30}
                                        source={{
                                            uri: data.photoURL
                                        }}/>
                                        <Text style={styles.reciverText}>{data.message}</Text>
                                    </View>
                                ):(
                                    <View key={id} style={styles.sender}>
                                        <Avatar/>
                                        <Text style={styles.senderText}>{data.message}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
            
                            <TextInput style={styles.input}  value={input} onChangeText={text=>setInput(text)} placeholder="Signal Message"
                            onSubmitEditing={sendMessage}
                            />

                            <TouchableOpacity onPress={sendMessage}>
                                <Ionicons name="send" size={24} color="blue"/>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    reciver:{
        padding:15,
        backgroundColor:"gray",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    sender:{
        padding:15,
        backgroundColor:"blue",
        alignSelf:"flex-start",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    reciverText:{},
    senderText:{},
    container:{
        flex:1,
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        padding:15,
        width:"100%",

    },
    input:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        borderColor:"black",
        backgroundColor:"lightgray",
        borderWidth:1,
        padding:10,
        borderRadius:30,
        color:"blue"
    }
    
})
