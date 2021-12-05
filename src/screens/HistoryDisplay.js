/*HistoryDisplay.js
//Purpose: HistoryDisplay will display data in a listView from the
//GithubAPI
//Developer: Ericka Capers
//Date: 12/5/2021
*/

//React Native Dependencies
import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';


export default function HistoryDisplay ({repoData}) {
  const [commitData, setCommitData] = useState([]);
  const [loadingCommits, setLoadingCommits] = useState(true);
  const [loadingMoreCommits, setLoadingMoreCommits] = useState(false);

  //makes async call to /repo/commits to return the most recent commits
  const requestSearchData = async ()  => {
    console.log('in this method');
     // If search field is not empty on button press
     //fetch search using search query
     console.log()
     fetch('https://api.github.com/repos/'+ repoData.owner.login +'/'+ repoData.name +'/commits?page=1')
            .then((response) => response.json())
            .then((responseJson) => {
              setCommitData(responseJson);
              setLoadingCommits(false);
            })
            .catch((error) => {
              console.error(error);
              setLoadingCommits(false);
            });

  };

  useEffect(() => {
    requestSearchData();
  }, []);


  return (
    <View>
     <Text style={{color: 'white'}}>
       {JSON.stringify(commitData)}
     </Text>
    </View>
  )
}