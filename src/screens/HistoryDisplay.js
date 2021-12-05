/*HistoryDisplay.js
//Purpose: HistoryDisplay will display data in a listView from the
//GithubAPI
//Developer: Ericka Capers
//Date: 12/3/2021
*/

//React Native Dependencies
import React from 'react';
import { Text, View } from 'react-native';


export default function HistoryDisplay ({repoData}) {
  return (
    <View>
     <Text style={{color: 'white'}}>
       {JSON.stringify(repoData)}
     </Text>
    </View>
  )
}