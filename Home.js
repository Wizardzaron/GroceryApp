import React, {useState, useEffect} from 'react';
import AppContext from './AppContext';

import {
  StyleSheet,
  View,
  Switch,
  FlatList,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {PaperProvider, Text, Button, Tooltip} from 'react-native-paper';

//console.log the data recieved from the api before outputting it on screen
//<Text style={styles.taskItem}>{item.productImage}</Text>

//const [error, setError] = useState([]);



const Home = ({route, navigation}) => {
  const context = React.useContext(AppContext);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {

    fetch('http://10.67.45.171:5000/products')
  .then((response) => response.json())
  .then((result) => {
    setProducts(result)
  })
  .catch(e => console.log(e))
  },[])

console.log(products);


    return (
      <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView>
          {/*<View style={styles.inputContainer}>*/}
            <Button onPress={() => {navigation.navigate('Form')}} > Add products</Button>
          {/*</View>*/}
          
          <FlatList
        data = {products}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {navigation.navigate('Description')}} >
          <View style={styles.listItem}>
              <Text style={styles.taskItem}>{item.productName}</Text>
              <Text style={styles.taskItem}>{item.stock}</Text>
              <Image
                style={styles.photo} 
                source={{uri: item.productImage}}
                onError={(error) => console.error('Error loading image:', error.nativeEvent.error)}
              />
              </View>
            </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>

    );

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

export default Home;