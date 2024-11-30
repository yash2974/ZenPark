
import { ThemedView } from '@/components/ThemedView';
import { Text, Image, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '@/components/firebaseconfig';
import { useState } from 'react';
import {useRouter} from 'expo-router'
import {useFonts} from 'expo-font';
const { width, height } = Dimensions.get('window'); // Get screen width and height


export default function LoginCreateScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [fontsLoaded] = useFonts({
    'MyCustomFont': require('@/assets/fonts/MontserratBold-p781R.otf'), // Path to the .otf file
  });

  

  const router = useRouter();

  const handleLogin = async () => {
    console.log("function tripped")
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);
      router.replace('/(tabs)')
      // Optionally, redirect the user to another screen after login.
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  // Only render the UI if the font has loaded
  if (!fontsLoaded) {
    return <ThemedView style={styles.container}><Text>Loading...</Text></ThemedView>;
  }

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/ZenPark_Transparent.png')}
        style={styles.logo}
      />
      
      <ThemedView style={styles.buttonsBox}>
        <><Text style={[styles.login]}>Login!</Text></>

        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value ={email}
          onChangeText={setEmail}
          placeholderTextColor="rgba(0, 0, 0, 0.3)"
        />

        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="rgba(0, 0, 0, 0.3)"
          secureTextEntry // Ensures password is hidden
        />
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <><Text style={styles.buttonText}>Login</Text></>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/createAccount')}>
    <Text style={[styles.createAccountText]}>Create an account!</Text>
  </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fffae0",
    flex: 1, // Ensures the container fills the screen
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center',
    
  },
  buttonsBox: {
    backgroundColor: "#000C20",
    justifyContent: 'center',
    alignItems: 'center', // Center content within the box
    borderRadius: 15, // Rounded corners
    width: width * 0.8, // 80% of the screen width
    height: height * 0.4, // Increased height to fit inputs
    padding: 20, // Add some padding to ensure content doesn't touch the edges
  },
  logo: {
    width: width * 0.5, // 50% of the screen width
    height: height * 0.2, // 20% of the screen height
    resizeMode: 'contain', // Ensures the logo maintains its aspect ratio
  },
  login: {
    fontSize: 20,
    marginBottom: 20, // Adds space between the text and input fields
    // fontWeight: 'bold',
    color:"#fff",
    fontFamily:'MyCustomFont'
  },
  input: {
    width: '100%', // Takes full width of the buttons box
    height: 40, // Fixed height for the input fields
    backgroundColor: '#FFFAE0',
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 15, // Adds space between input fields
    fontFamily:'MyCustomFont'
  },
  
  button: {
    backgroundColor: '#EF3340', // Green background for the button
    paddingVertical: 10,
    width: '100%', // Button takes full width
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFAE0',
    fontSize: 15,
    // fontWeight: 'bold',
    fontFamily:'MyCustomFont'
  },errorText: {
    color: 'red',
    marginBottom: 10,
  },createAccountText: {
    fontSize:13,
    color: '#FFFAE0',
    marginTop: 15,
    fontFamily:'MyCustomFont'
  },
});
