/*SearchBarElement.js
//Purpose: layout for the search bar. this will allow users to search
//for a specific repo and select it
//Developer: Ericka Capers
//Date: 12/4/2021
*/

//React Native Dependencies
import React, { useState }  from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions, Button,
TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  HistoryDisplay from '../screens/HistoryDisplay';

//grab dimensions of the device being used
var dimensions = {
width: Dimensions.get('window').width,
height: Dimensions.get('window').height
}

//creates layout for search bar and filtered data on search
//by making a request to the github search api
export default function SearchBarElement () {
   const navigation = useNavigation();
   const [search, setSearch] = useState('');
   const [results, setResults] = useState('');
   const [advancedSearch, setAdvancedSearch] = useState(false);
   const [repoName, setRepoName] = useState('');
   const [repoOwner, setRepoOwner] = useState('');
   const [repoData, setRepoData] = useState([]);
   const [loadingSearch, setLoading] = useState(false);
   const [displaySearch, setDisplay] = useState(true);
   const [commits, setCommits] = useState([]);
   const [loadingCommits, setLoadingCommits] = useState(false);

   //method passed to HistoryDisplay to change view
   const callbackFunction = (childData) => {
      setDisplay(childData);
   };

   //makes async call to search/repo to return repos related to search query
   const requestSearchData = async ()  => {
      setLoading(true);
      setResults('');
      if (search) {
             // If search field is not empty on button press
             //fetch search using search query
             fetch('https://api.github.com/search/repositories?q='+ search + '&per_page=100')
                    .then((response) => response.json())
                    .then((responseJson) => {
                      console.log(responseJson.items);
                      //if bad request display error otherwise,
                      //if results are empty display no results
                      if ('errors' in responseJson){
                        console.log('contains error');
                        setResults('No Results');
                        Alert.alert(
                          'Warning',
                          'Repo names characters must be either a hyphen ( - ) or alphanumeric, they cannot start with a hyphen and cannot include consecutive hyphens.',
                          [
                            {text: 'Ok', style: 'cancel'},
                          ],
                          {
                            cancelable: true
                          }
                        );
                      } else if(!responseJson.items.length){
                        setResults('No Results');
                      } else {
                        setResults('');
                        setRepoData(responseJson.items);
                      }
                      setLoading(false);
                    })
                    .catch((error) => {
                      console.error(error);
                      setLoading(false);
                    });
      }

   };

   const setData = (responseJson) => {
    setCommits(responseJson);
    setLoadingCommits(false);
    setDisplay(false);
    setLoading(false);
   }

   //makes async call to /repos/owner/repo commits to return the most recent commits
     const requestCommitsData = (repInformation)  => {
        setLoadingCommits(false);
        setRepoName(repInformation.name);
        setRepoOwner(repInformation.owner.login);
        //fetch search using search query
        fetch('https://api.github.com/repos/'+ repInformation.owner.login +'/'+ repInformation.name +'/commits?page=1')
               .then((response) => response.json())
               .then((responseJson) => {
                if(responseJson.length < 30){
                  Alert.alert(
                    'Warning',
                    'This Repo contains fewer than 25 commits',
                    [
                      {text: 'Continue', onPress: () => setData(responseJson), style: 'cancel'},
                      {text: 'Ok', style: 'cancel'},
                    ],
                    {
                      cancelable: true
                    }
                  );
                }else {
                   setCommits(responseJson);
                   setLoadingCommits(false);
                   setDisplay(false);
                   setLoading(false);
                 }
               })
               .catch((error) => {
                 console.error(error);
                 setLoadingCommits(false);
               });

     };

   //formating for list items
   const RepoSearches = ({item}) => {
     return (
       // Flat List Item
       <Text
         style={styles.repoStyle}
         onPress={() => getRepo(item)}>
         {item.name.toUpperCase()}
       </Text>
     );
   };

  // Flat List Item Separator
   const Separators = () => {
     return (
       <View style={styles.separatorStyle} />
     );
   };

   //update the search displayed
   const updateSearch = (text) => {
      setSearch(text);
      //if search is cleared, clear filtered results
      if(text === ''){
        setRepoData([]);
      }
   }

   // Function for click on repo item
   const getRepo = (item) => {
     //alert(item.name);
     //navigation.navigate('History', {repoInfo: item.name})
     requestCommitsData(item);
   };

    return (
      <View style={styles.mainView}>
      {advancedSearch ? (<Text>hi</Text>):
      (<View>
      {displaySearch ? (
        <View>
          <View style = {styles.titlesView}>
            <Text style={styles.titleStyle}> Search Page </Text>
          </View>
          <SearchBar
            onChangeText={(text) => updateSearch(text)}
            value={search}
            inputStyle={styles.inputStyles}
            containerStyle={styles.container}
            inputContainerStyle={styles.inputStyles}
            placeholder={'Search for a repo...'}
          />
          <View style = {styles.titlesView}>
          {results === ''? null: (<Text style={styles.titleStyle}>{results}</Text>)}
          </View>
          {repoData.length ?
            (<View>
            <View style={styles.flatListContainer}>
               <FlatList
                  data={repoData}
                  keyExtractor={(item, index) => index.toString()}
                  ItemSeparatorComponent={Separators}
                  renderItem={RepoSearches}
               />
            </View>
             <TouchableOpacity  onPress={() => setAdvancedSearch(true)} style={styles.button}>
                <Text style={styles.buttonText}>Advanced Search</Text>
                                         </TouchableOpacity>
            </View>) :
            (loadingSearch?
              (<ActivityIndicator color={'#fff'} />):
              (<TouchableOpacity  onPress={requestSearchData} style={styles.button}>
                <Text style={styles.buttonText}>Search Specific Repository</Text>
              </TouchableOpacity>))
          }
        </View>) :
        <HistoryDisplay commitData={commits} back={callbackFunction}
        repoName={repoName} repoOwner={repoOwner}/>}
        </View>)}
      </View>
    );
}

//styles for SearchBarElement.js
const styles = StyleSheet.create({
  mainView: {
    top: 20,
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
  separatorStyle: {
     height: 0.5,
     width: '100%',
     backgroundColor: '#6D6E9B',
  },
  container: {
    backgroundColor: '#483766',
    borderRadius: 5,
    borderWidth: 2
  },
  flatListContainer: {
    elevation: 2,
    height: dimensions.height * .5,
    borderRadius: 5,
    borderWidth: 2,
  },
  inputStyles: {
    backgroundColor: 'white'
  },
  repoStyle: {
    backgroundColor: '#483766',
    color: 'white',
  },
  button: {
      width: dimensions.width >= 500?
        dimensions.width*.4 : dimensions.width*.7,
      backgroundColor: "#483766",
      padding: 20,
      borderRadius: 10,
      marginTop: 20,
      alignSelf: "center",
  },
  buttonText: {
      color: "white",
      textAlign: "center"
  }
 });