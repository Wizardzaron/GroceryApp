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


const Update = ({route, navigation}) => {

  const [stock, setStock] = useState(0);

  const {id} = route.params

  console.log(id);


  const handleStock = (text) => {

    // Allow only numbers 
    const numericValue = text.replace(/[^0-9]/g, ""); 
    const decimalCount = numericValue.split('.').length - 1;
    if (decimalCount != 1) {
      setStock(numericValue);
    } else {
      // Alert the user about invalid input
      Alert.alert('Invalid Input', 'Please enter a valid numeric value.');
    } 

  }



  const updateForm = () => {

    const url = 'http://10.67.36.143:5000/update?id=' + id;

    const formData = new FormData();
    const stockCount = parseInt(stock);
    formData.append("stock", stockCount);
    try{
      const posting = fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
      });

      //const responseData = posting.json();
      //console.log('Upload successful:', responseData);
      console.log('Upload successful');
      setStock(0);

      navigation.goBack();

    } catch(error){
        console.error("Error occured at posting data: ",error);
      }

  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
            <TextInput
                placeholder="How many are currently in stock?"
                style={styles.input}
                onChangeText={handleStock}
                value={stock}
            />
      </View>
      <View>
          <Button title="UPDATE PRODUCT" onPress={updateForm} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  }
});



export default Update;