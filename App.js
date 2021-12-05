/*App.Js is the main entry of this project
//Purpose: This application will allow users to search the most recent
//commits of a repository or review the most recent commits globally
//Developer: Ericka Capers
//Date: 12/3/2021
*/

//React Native Dependencies
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//project dependencies
import StartScreen from './src/screens/StartScreen';
import RepoSearch from './src/screens/RepoSearch';
import HistoryDisplay from './src/screens/HistoryDisplay'

//create a variable to navigate through the application
const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
        <Stack.Navigator>
                <Stack.Screen
                  name="Start"
                  component={ StartScreen }
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Search"
                  component={ RepoSearch }
                  options={{ headerShown: false }}
                />
        </Stack.Navigator>
     </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
