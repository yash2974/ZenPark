import { ThemedView } from '@/components/ThemedView';
import { StyleSheet, Image, Platform ,Dimensions} from 'react-native';

const { height, width } = Dimensions.get("window");

export default function TabTwoScreen() {
  return (
    
    
    <ThemedView style={styles.container}>
      
      
    </ThemedView>
    
  );
}

const styles = StyleSheet.create({

    container:{
      backgroundColor:"#FFFAE0",
      flex:1
    },
    
});
