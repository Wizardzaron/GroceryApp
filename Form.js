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
  Text,
  Alert,
} from 'react-native';

const Task = ({route, navigation}) => {

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [price, setPrice] = useState(0.0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');

  /*const handleImage = (text) => {
  }*/


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

  const handlePrice = (text) => { 
    // Allow only numbers 
    const numericValue = text.replace(/[^0-9.]/g, ""); 
    const decimalCount = numericValue.split('.').length - 1;
    if (decimalCount <= 1) {
      setPrice(numericValue);
    } else {
      // Alert the user about invalid input
      Alert.alert('Invalid Input', 'Please enter a valid numeric value.');
    }
  }
  
  const submitForm = () => {

    const formData = new FormData();
    const floatPrice = parseFloat(price);
    const stockCount = parseInt(stock);

    formData.append("productname", name);
    formData.append("manufacture", manufacturer);
    formData.append("price", floatPrice);
    formData.append("stock", stockCount);
    formData.append("description", description);
    formData.append("productimage", image);

    
    try{
        const posting = fetch('http://10.67.36.143:5000/product', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        //const responseData = posting.json();
        //console.log('Upload successful:', responseData);
        console.log('Upload successful');

        setName('');
        setImage('');
        setManufacturer('');
        setPrice(0.0);
        setStock(0);
        setDescription('');

        navigation.goBack();

      } catch(error){
          console.error("Error occured at posting data: ",error);
        }

  };

    return (
        <View style={styles.screen}>
          <View style={styles.inputContainer}>
            <TextInput
                placeholder="What's the product's name?"
                style={styles.input}
                onChangeText={setName}
                value={name}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
                placeholder="What's the manufacturer's name?"
                style={styles.input}
                onChangeText={setManufacturer}
                value={manufacturer}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
                placeholder="How much will the product cost?"
                style={styles.input}
                onChangeText={handlePrice}
                value={price}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
                placeholder="How many are currently in stock?"
                style={styles.input}
                onChangeText={handleStock}
                value={stock}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
                placeholder="Do you have the url address of the image?"
                style={styles.input}
                onChangeText={setImage}
                value={image}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
                placeholder="Can you give a description of what the product is?"
                style={styles.input}
                onChangeText={setDescription}
                value={description}
            />
          </View>
          <View>
          <Button title="ADD PRODUCT" onPress={submitForm} />
          </View>
          <View>
          <Button title="Go Back" onPress={() => navigation.goBack() } />
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
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10
  }
});

export default Task;