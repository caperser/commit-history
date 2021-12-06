/*HistoryDisplay.js
//Purpose: HistoryDisplay will display data in a listView from the
//GithubAPI
//Developer: Ericka Capers
//Date: 12/5/2021
*/

//React Native Dependencies
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SectionList,
 ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';


//grab dimensions of the device being used
var dimensions = {
width: Dimensions.get('window').width,
height: Dimensions.get('window').height
}

export default function HistoryDisplay ({commitData, back, repoName, repoOwner}) {
  const [commitId,updateCommitId] = useState('')
  const [loadingMoreCommits, setLoadingMoreCommits] = useState(false);
  const [commits, setCommitsData] = useState(commitData);
  console.log(commitData);

  // Flat List Item Separator
   const Separators = () => {
     return (
       <View style={styles.separatorStyle} />
     );
   };

  const RepoSearches = ({item}) => {
     return (
       // Flat List Item
       <Text
         style={styles.repoStyle}
         onPress={() => getRepo(item)}>
         {item.commit.author.name}
       </Text>
     );
  };

  // Function for click on commit item
  const getCommit = (item) => {
   //alert(item.name);
  };

  //go back from commit display
  const goBack = () => {
   back(true);
  };

   //makes async call to /repos/owner/repo commits to return the most recent commits
   const requestMoreData = (owner, name)  => {
      //fetch search using search query
      fetch('https://api.github.com/repos/'+ repoOwner +'/'+ repoName +'/commits?page=2')
             .then((response) => response.json())
             .then((responseJson) => {
              if(responseJson.length < 30){
                console.log('end of repo');
              }else {
                console.log('more ifo likely');
              }
             })
             .catch((error) => {
               console.error(error);
             });

   };

  return (
    <View style={styles.historyView}>
      <Button
        buttonStyle={ styles.backButton }
        onPress={goBack}
        icon={
          <Icon
            name="arrow-left"
            size={20}
            color="white"
          />
        }
        iconLeft
        title="Search Again"
      />
      <View style = {styles.titlesView}>
        <Text style={styles.titleStyle}> {repoName} Commit History </Text>
      </View>
     <View style={styles.sectionContainer}>
     <SectionList
        ItemSeparatorComponent={Separators}
        sections={[
          { title: 'Commits', data: commits },
        ]}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeaderStyle}> {section.title} </Text>
        )}
        renderItem={({ item }) => (
          <View onPress={() => getCommit(item)}>
          <Text style={styles.sectionListItemStyle}>
            <Text style={styles.valueHeaders}>Author: </Text>
            <Text style={styles.dataStyle}>{item.commit.author.name}</Text>
          </Text>
          <Text style={styles.sectionListItemStyle}>
            <Text style={styles.valueHeaders}>Message: </Text>
            <Text style={styles.dataStyle}>{item.commit.message}</Text>
          </Text>
          <Text style={styles.sectionListItemStyle}>
            <Text style={styles.valueHeaders}>Hash: </Text>
            <Text style={styles.dataStyle}>{item.sha}</Text>
          </Text>
          </View>
        )}
        keyExtractor={(item, index) => index}
        ListFooterComponent={
        <TouchableOpacity  onPress={requestMoreData} style={styles.button}>
          <Text style={styles.buttonText}>View More</Text>
        </TouchableOpacity>}
      /></View>
   </View>
  )
}

//styles for HistoryDisplay.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
  },
  sectionContainer: {
    height: dimensions.height *.8
  },
  viewMore: {
    bottom: 20
  },
  historyView: {
    top: 20,
    left: 5,
    right: 5,
  },
  backButton: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-start'
  },
  dataStyle: {
    fontSize: 16,
    color: 'white'
  },
  valueHeaders: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  repoStyle: {
      backgroundColor: '#483766',
      color: 'white',
    },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  titleStyle: {
    fontSize: 24,
    color: 'white',
  },
  separatorStyle: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',

  },
  sectionListItemStyle: {
    fontSize: 15,
    padding: 15,
    color: '#000',
    backgroundColor: '#483766',
  },
  titleStyle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '100',
    fontFamily: 'sans-serif-thin'
  },
  titlesView: {
    alignItems: 'center',
  },
  button: {
      width: '100%',
      height: dimensions.height*.05,
      backgroundColor: "#7F6D9B",
      alignSelf: "center",
       flex: 1,
       justifyContent: 'flex-end',
       marginBottom: 30
  },
  buttonText: {
      color: "white",
      textAlign: "center",
      marginBottom: 10,
  }
});