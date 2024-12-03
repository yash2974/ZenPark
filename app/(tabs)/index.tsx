import { Image, StyleSheet, Platform ,Text} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
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
  const [vehicle, setVehicle] = useState(null);
  
  const router = useRouter();
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

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.text}>Welcome, {user?.email}!</Text>
      <Text style={styles.text}>Your Vehicle: {vehicle || 'Not available'}</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAE0',
  },
  text: {
    fontSize: 18,
    margin: 10,
    color: '#000',
  },
});