import React,{useLayoutEffect, useState,useEffect} from 'react'
import { StyleSheet,TouchableOpacity,ScrollView,SafeAreaView,View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth,db } from '../firebase'
import {AntDesign,SimpleLineIcons} from "@expo/vector-icons"

const HomeScreen = ({navigation}) => {
    const [chats,setChats] = useState([])
    const signOutUser = () => {
        auth.signOut().then(()=>{
            navigation.replace("Login")
            auth.SI
        });
    }

    useEffect( () => {
        console.log("-->",setChats)
        const unsubscribe  = db.collection("chats").onSnapshot( (snapshot)=>{
            setChats(
                snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data(),
            }))
            )
        });
      return unsubscribe;
    }, [])
    
    useLayoutEffect(() => {
        navigation.setOptions({
        title:"Signal",
        headerStyle:{backgroundColor:"white"},
        headerLeft:()=>(
             <TouchableOpacity onPress={signOutUser} style={{marginLeft:20}}>
                 <Avatar
                 rounded
                 source={{uri: auth?.currentUser?.photoURL}}
                 />
             </TouchableOpacity>

         ),
         headerRight:()=>(
             <View
             style={{
                 flexDirection:"row",
                 justifyContent:"space-between",
                 width:80,
                 marginRight:20
             }}
             >
                <TouchableOpacity>
                    <AntDesign name="camerao" size={24} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate("AddChat")}}>
                    <SimpleLineIcons name="pencil" size={24} color="black"/>
                </TouchableOpacity>
             </View>

         )
       })}, [navigation])

    const enterChat = (id,chatName) => {
        navigation.navigate("Chat",{
            id:id,
            chatName:chatName
        })
    }
    return (
        <SafeAreaView >
            <ScrollView style={styles.container}>
                {chats.map(
                    ({id,data: {chatName}})=>(
                        <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        height:"100%",

        
    }
})

export default HomeScreen
