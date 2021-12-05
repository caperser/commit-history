/*RepoSearch.js
//Purpose: RepoSearch will allow users to search for a specific
//repository so that the data returned is relevant to that repository
//Developer: Ericka Capers
//Date: 12/3/2021
*/

//React Native Dependencies
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  SearchBarElement from '../features/SearchBarElement'



export default function RepoSearch () {
  return (
    <View style={styles.mainView}>
      <SearchBarElement />
    </View>
  )
}

//styles for RepoSearch.js
const styles = StyleSheet.create({
   mainView: {
   backgroundColor: '#110726',
   flex: 1
  },
});