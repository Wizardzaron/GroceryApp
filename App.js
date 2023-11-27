import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./Home";
import Form from "./Form" ;
import Description from "./Description";
import Update from "./Update";

import AppContext from './AppContext';

const Stack = createNativeStackNavigator();

const App = () => {

    const [books, setBooks] = useState([]);

    const contextValue = {

        books

    }
    return(
        <AppContext.Provider value={contextValue}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="Description" component={Description} />
        <Stack.Screen name="Update" component={Update} />

        </Stack.Navigator>
        </NavigationContainer>
        </AppContext.Provider>
    );
};

export default App;