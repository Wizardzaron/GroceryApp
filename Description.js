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
    const [item, setItem] = useState(null);

    const {id} = route.params

    console.log(id)

    const url = 'http://10.67.36.143:5000/description?id=' + id;

    useEffect(() => {

        fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setItem(result)
      })
      .catch(e => console.log(e))
      },[id])

      if(item == null){
        return <View/>
      }

      const userClickedDeleteTask = () => {

        const url = 'http://10.67.36.143:5000/delete?id=' + id;        
        fetch(url,{
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: null
        })
      
        navigation.goBack();
      }

   return( 
    <PaperProvider>
    <SafeAreaProvider>
      <SafeAreaView>
              <Text style={styles.taskItem}>{item.productName}</Text>
              <Text style={styles.taskItem}>{item.manufacture}</Text>
              <Text style={styles.taskItem}>{item.price}</Text>
              <Text style={styles.taskItem}>{item.stock}</Text>
              <Text style={styles.taskItem}>{item.description}</Text>


              <Image
                style={styles.photo} 
                source={{uri: item.productImage}}
                onError={(error) => console.error('Error loading image:', error.nativeEvent.error)}
              />

              <View>
              <Button title="DELETE" onPress={userClickedDeleteTask} />
              </View>
              <View>
              <Button title="UPDATE STOCK" onPress={() => navigation.navigate('Update', {id: id})}  />
              </View>
              <View>
              <Button title="GO BACK" onPress={() => navigation.goBack()} />
              </View>

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