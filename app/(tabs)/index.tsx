import { Image, StyleSheet, Platform ,Text, Button} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import {useFonts} from 'expo-font';
import { ThemedView } from '@/components/ThemedView';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import {useRouter} from 'expo-router';
import { auth,db } from '@/components/firebaseconfig';
import { User } from 'firebase/auth';

// auth.signOut().then(() => console.log('Session cleared'));



export default function HomeScreen() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState([]);
  
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'MyCustomFont': require('@/assets/fonts/MontserratBold-p781R.otf'), // Path to the .otf file
  });
  console.log("uppper")
  useEffect(() => {
    const fetchUserData = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          console.log('User is logged in:', currentUser);
          setUser(currentUser);
  
          // Fetch user data from Firestore
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
  
          if (userDoc.exists()) {
            console.log('User data:', userDoc.data());
            setVehicle(userDoc.data().vehicle); // Assuming the field is named `vehicle`
          } else {
            console.log('No such document!');
          }
        } else {
          console.log('No user is logged in');
          setUser(null);
          router.push('/login-createScreen'); // Redirect to login screen
        }
        setLoading(false);
      });
  
      return unsubscribe; // Return the unsubscribe function
    };
  
    fetchUserData(); // Call the async function
  }, []);
  console.log(vehicle)

  if (vehicle.length===0){
    return(
      <ThemedView style={styles.container1}>
      <ThemedView style={styles.box}>
        <Text style={styles.text}>Oops you dont have any vehicle registered!</Text>
        <Button title="Add a vehicle" onPress={()=>{router.push('/userDetails')}}></Button>
      </ThemedView>
    </ThemedView>
    )
  }
  else{
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/ZenPark_Transparent.png')}
        style={styles.logo}
      />
    </ThemedView>
  );
}
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAE0',
    
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFAE0',
    paddingTop: 20,
    
  },
  box:{
    backgroundColor:"#000C20"
  },
  text: {
    fontSize: 18,
    margin: 10,
    color: '#FFFAE0',
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 100, // Adjust height as needed
    resizeMode: 'contain', // Ensures the image scales correctly
    },
  
});