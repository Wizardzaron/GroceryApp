import React, {useState, useEffect} from 'react';
import AppContext from './AppContext';

import {
  StyleSheet,
  View,
  Switch,
  FlatList,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {PaperProvider, Text} from 'react-native-paper';

const Descript = ({route, navigation}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetch('http://10.67.45.171:5000/description?id=1')
      .then((response) => response.json())
      .then((result) => {
        setProducts(result)
      })
      .catch(e => console.log(e))
      },[])

    console.log(products)
   return( 
    <PaperProvider>
    <SafeAreaProvider>
      <SafeAreaView>
        <FlatList
        data = {products}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
              <Text style={styles.taskItem}>{item.productName}</Text>
              <Text style={styles.taskItem}>{item.manufacture}</Text>
              <Text style={styles.taskItem}>{item.price}</Text>
              <Text style={styles.taskItem}>{item.stock}</Text>
              <Text style={styles.taskItem}>{item.Description}</Text>


              <Image
                style={styles.photo} 
                source={{uri: item.productImage}}
                onError={(error) => console.error('Error loading image:', error.nativeEvent.error)}
              />
            </View>
            )}

        />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>

    )
};

const styles = StyleSheet.create({
    photo: {
      flex: 0,
      width: 130,
      height: 130,
  
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'blue',
      width: 40,
      height: 40,
      padding: 50
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      borderWidth: 1,
      marginVertical: 10,
      padding: 3
    },  
    taskItem: { 
      color: 'black'
    }
  
  });


export default Descript;