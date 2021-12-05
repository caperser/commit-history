/*HistoryDisplay.js
//Purpose: HistoryDisplay will display data in a listView from the
//GithubAPI
//Developer: Ericka Capers
//Date: 12/5/2021
*/

//React Native Dependencies
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SectionList,
 ActivityIndicator } from 'react-native';


export default function HistoryDisplay ({commitData}) {
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

  return (
    <View>
     <SectionList
        ItemSeparatorComponent={Separators}
        sections={[
          { title: 'Commits', data: commitData },
        ]}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionHeaderStyle}> {section.title} </Text>
        )}
        renderItem={({ item }) => (
          <View onPress={() => getCommit(item)}>
          <Text style={styles.sectionListItemStyle}>
            Author: {item.commit.author.name}
          </Text>
          <Text style={styles.sectionListItemStyle}>
            Message: {item.commit.message}
          </Text>
          <Text style={styles.sectionListItemStyle}>
                      Hash: {item.sha}
                    </Text>
          </View>
        )}
        keyExtractor={(item, index) => index}
      />
   </View>
  )
}

//styles for HistoryDisplay.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16
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
    backgroundColor: '#F5F5F5',
  },
});