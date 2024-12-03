import { auth, db } from '@/components/firebaseconfig';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform ,Dimensions,Text} from 'react-native';

const { height, width } = Dimensions.get("window");

export default function TabTwoScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [userData,setUserData] = useState(null);

  useEffect(()=>{
    const fetchUserData = async()=>{
      const unsubscribe = onAuthStateChanged(auth, async (currentUser)=>{
        if (currentUser){
            setUser(currentUser);

            const userDocRef = doc(db,'users',currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()){
              console.log(userDoc.data())
            }
            else{
              console.log('No user is logged in');
              setUser(null);
              router.push('/login-createScreen');
            }
        }
      });
      return unsubscribe;
    };
    fetchUserData();
  },[])


  return (
    <ThemedView style={styles.container}>
      <Image style={styles.profilePicture} source={require('@/assets/images/favicon.png')}></Image>
      <ThemedView style={styles.box}>
        <Text style={styles.Text}>yash</Text>
      </ThemedView>
    </ThemedView>
    
  );
}

const styles = StyleSheet.create({

    container:{
      paddingTop: 50,
      backgroundColor:"#FFFAE0",
      flex:1,
      justifyContent:"flex-start",
      alignItems:'center',
    },
    profilePicture:{
      width:100,
      height:100,
      borderRadius:50
    },
    box:{
      backgroundColor:"#000C20",
      margin:50,
      padding:20
    },
    Text:{
      color:"#EF3340"
    }
    
});
