/*SearchBarElement.js
//Purpose: layout for the search bar. this will allow users to search
//for a specific repo and select it
//Developer: Ericka Capers
//Date: 12/4/2021
*/

//React Native Dependencies
import React, { useState }  from 'react';
import { Text, View, StyleSheet, FlatList, Dimensions, Button,
TouchableOpacity, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//grab dimensions of the device being used
var dimensions = {
width: Dimensions.get('window').width,
height: Dimensions.get('window').height
}

//creates layout for search bar and filtered data on search
//by making a request to the github search api
export default function SearchBarElement () {
   const [search, setSearch] = useState('');
   const [repoData, setRepoData] = useState([]);
   var loadingSearch = false;

   //makes async call to search/repo to return repos related to search query
   const requestSearchData = async ()  => {
      loadingSearch = true;
      if (search) {
             // If search field is not empty on button press
             //fetch search using search query
             fetch('https://api.github.com/search/repositories?q='+ search)
                    .then((response) => response.json())
                    .then((responseJson) => {
                      setRepoData(responseJson.items);
                      loadingSearch = false;
                    })
                    .catch((error) => {
                      console.error(error);
                      loadingSearch = false;
                    });
      }

   };

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
        console.log('is equal');
        setRepoData([]);
      }
   }

   // Function for click on repo item
   const getRepo = (item) => {
     alert(item.name);
   };

    return (
            <View>
            <SearchBar
                      onChangeText={(text) => updateSearch(text)}
                      value={search}
                      inputStyle={styles.inputStyles}
                      containerStyle={styles.container}
                      inputContainerStyle={styles.inputStyles}
                      placeholder={'Search for a repo...'}
                    />
                    {repoData.length ? (
                      <View style={ styles.flatListContainer }>
                         <FlatList
                            data={repoData}
                            keyExtractor={(item, index) => index.toString()}
                            ItemSeparatorComponent={Separators}
                            renderItem={RepoSearches}
                         />
                      </View>) :
                      loadingSearch? <ActivityIndicator color={"#fff"} />:
                      <TouchableOpacity  onPress={requestSearchData} style={styles.button}>
                        <Text style={styles.buttonText}>Search Specific Repository</Text>
                      </TouchableOpacity>
                    }

            </View>
    );
}

//styles for SearchBarElement.js
const styles = StyleSheet.create({
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